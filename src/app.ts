import express from 'express';
import authMiddleware from './middleware/auth';
import usersRoute from './routes/UserRoute';
import shortcuts from './routes/ShorcutRoute'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//public routes
app.get("/", (req, res) => {
    res.send({ online: true })
})
app.use(usersRoute);

app.use(authMiddleware);
//private routes

app.use('/shortcuts',shortcuts);


export default app;
