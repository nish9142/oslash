import express from 'express';
import dataSource from '../dataSource';
import { ShortCut } from '../entities/ShortcutEntity';
import { User } from '../entities/UserEntity';
import { allRequiredKeysPresent } from '../utils/helpers';

const router = express.Router();

enum SHORTCUT_FILTERS{
    SHORT_LINK = 'shortlink',
    DESCRIPTION = 'description',
    CREATE_AT = 'create_at'
}

enum ORDER{
    ASC = "ASC", 
    DESC ="DESC"
}

router.post('/create', async (req, res) => {
    try {
        const payload = req.body || {};
        const requiredKeys = ['shortlink', 'url'];
        allRequiredKeysPresent(requiredKeys, payload, res);
        //@ts-ignore
        const user = req.user
        const shortcutRepo = dataSource.getRepository(ShortCut)
        const shortcut = await shortcutRepo.save(shortcutRepo.create({ ...payload, user:user.id }))
        return res.json(shortcut);
    } catch (error: any) {
        console.error(error);
        res.status(500).send({ error: error?.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const payload = req.body || {};
        const order: { sort: string, order?: "ASC" | "DESC" }[] = payload?.order || []
        //@ts-ignore
        const user = req.user
        const limit = payload?.limit ?? 20
        const skip = payload?.skip ?? 0
        const shortcuts = await getShortCuts(user.id,order,payload?.search,limit,skip)
        return res.json(shortcuts);
    } catch (error: any) {
        console.error(error);
        res.status(500).send({ error: error?.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const shortcutId = parseInt(req?.params?.id)
        if (isNaN(shortcutId)) {
          throw new Error(`Invalid shortcut id`)
        }
        //@ts-ignore
        const user = req.user
        const userRepository = dataSource.getRepository(User)
        const currentUser = await userRepository.findOne({   where: { id: user.id } })
        const shortcutRepo = dataSource.getRepository(ShortCut)
        const shortcut = await shortcutRepo.findOne({ relations: { user: true }, where: { id: shortcutId } })
        if (shortcut.user.id !== currentUser.id) {
            throw new Error(`Unauthorized operation for this user`)
        }
        await shortcutRepo.remove([shortcut])
        delete shortcut.user
        return res.json(shortcut);
    } catch (error: any) {
        console.error(error);
        res.status(500).send({ error: error?.message });
    }
});

function getShortCuts(userId: number, order:{sort: string, order?: "ASC" | "DESC"}[] = [], search: string, limit: number = 20, skip: number = 0) {
    const shortcutRepo = dataSource.getRepository(ShortCut)
    let query = shortcutRepo.createQueryBuilder("shortcut")
        .leftJoin('shortcut.user', 'user')
        .where('user.id =:id', { userId })
    if (search && search.length > 1) {
        query.where('shortcut.search @@ to_tsquery(:search)', { search })
    }
    order.map(({sort,order='ASC'}) => {
        query.addOrderBy(sort,order)
    })
    query.limit(limit)
    query.skip(skip)

    return query.getMany()
}

export default router;
