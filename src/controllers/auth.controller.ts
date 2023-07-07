import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
dotenv.config();
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

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(400).send({ "msg": "user don't exist please register first" });
        } else {
            bcrypt.compare(password, user.password, async (err: Error | undefined, result: boolean) => {
                if (result) {

                    var token = jwt.sign({ userId: user._id, role: [user.role] }, "varthak", { expiresIn: "3h" });
                    res.status(200).send({
                        "msg": "user logged in successful",
                        "user": {
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                            mobileNumber: user.mobileNumber,
                            role: user.role,
                            token:token
                        }
                    })
                } else {
                    res.status(400).send({ "msg": "Wrong password or email" })
                }
            });
        }
    } catch (error: any) {
        res.status(500).send({ "msg": "Something went wrong", "error": error.message });
    }
};
