import express from 'express';
import { allRequiredKeysPresent } from '../utils/helpers';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../utils/constants';
import dataSource from '../dataSource';
import { User } from '../entities/UserEntity';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const payload = req.body || {};
    const requiredKeys = ['username', 'password'];
    allRequiredKeysPresent(requiredKeys, payload, res);
    payload.username = payload.username.toLowerCase();
    const userRepository = dataSource.getRepository(User)
    const user = await userRepository.save(userRepository.create(payload))
    return res.json(user);
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error?.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const payload = req.body || {};
    const requiredKeys = ['username', 'password'];
    allRequiredKeysPresent(requiredKeys, payload, res);
    payload.username = payload.username.toLowerCase();
    const userRepository = dataSource.getRepository(User)
    const user = await userRepository.findOne({where:{username:payload.username,password:payload.password}})
    if (!user) {
      throw new Error('Invalid username or password');
    }
    const token = jwt.sign({ id:user.id,username:user.username}, JWT_SECRET_KEY);
    res.json({ username:payload.username,token });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error?.message });
  }
});

export default router;
