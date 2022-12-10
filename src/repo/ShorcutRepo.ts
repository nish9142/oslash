import dataSource from '../dataSource'
import { ShortCut } from '../entities/ShortcutEntity'

export const ShortCutRepo = dataSource.getRepository<ShortCut>(ShortCut).extend({
    getShortCuts(userId: number,order:any={},search:any,limit:number=20,skip:number=0) {
        return this.createQueryBuilder("shortcut")
            .leftJoinAndSelect('shortcut.user', 'user')
            .where('user.id =:id', { userId })
            .where('shortcut.search @@ to_tsquery(:search)', { search })
            .order()
            
    },
})