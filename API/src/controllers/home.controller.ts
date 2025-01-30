import { Request, Response } from "express";

export default class HomeController {

    async welcome(req: Request, res: Response) {
        try {
            res.status(200).send({
                message: "Отдать тут можно массив данных общего толка (сколько пользователей, активных пользователей, бизнесов и т.д.)"
            });
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }
}
