import express from 'express';
import { login, signup } from '../controllers/auth.controller';

//Creating user authentication route
const userRouter = express.Router();


//User Register route
userRouter.post('/register', signup);


//User login route
userRouter.post('/login', login);

//Export
export default userRouter