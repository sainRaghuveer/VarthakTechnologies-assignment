import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';


export const signup = (req: Request, res: Response) => {
    res.send("user signed up");
};

export const login = (req: Request, res: Response) => {
    res.send("user logged in");
};
