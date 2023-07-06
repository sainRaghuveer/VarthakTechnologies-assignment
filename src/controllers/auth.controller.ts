import { Request, Response } from 'express';
const bcrypt = require("bcrypt");
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';


export const signup = async (req: Request, res: Response) => {
    const { name, email, password, mobileNumber, role } = req.body;

    if (!name || !email || !password || !mobileNumber || !role) {
        res.status(400);
        throw new Error("Please Enter all the Fields");
    }

    try {
        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        } else {
            bcrypt.hash(password, 5, async (err: Error | undefined, hash: string) => {
                if (err) {
                    res.status(400).send({ "msg": "bcrypt password error" });
                } else {
                    const user = await UserModel.create({ name, email, password: hash, mobileNumber, role });

                    if (user) {
                        res.status(201).json({
                            "mag": "User registered successfully",
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                            mobileNumber: user.mobileNumber,
                            role: user.role
                        });
                    } else {
                        res.status(400);
                        throw new Error("User not found");
                    }
                }
            })
        }
    } catch (error: any) {
        res.status(500).send({ "msg": "Something went wrong", "error": error.message });
    }
};

export const login = (req: Request, res: Response) => {
    res.send("user logged in");
};
