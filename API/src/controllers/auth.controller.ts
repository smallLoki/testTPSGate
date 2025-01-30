import { Request, Response } from "express";
import User from "../models/user.model";
import authRepository from "../repositories/auth.repository";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../middleware/auth";

export default class AuthController {

    // Вход в админку
    async loginAdmin(req: Request, res: Response) {
        try {
            const users: User[] = await authRepository.loginAdmin(req.body);
            if (users.length < 1) {
                throw new Error('Bad auth data!');
            }
            const user = new User(users[0]);
            const { payload } = user.getAuthData();
            const token = jwt.sign(payload, SECRET_KEY);
            res.status(200).json({
                token,
                auth: true
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }
}
