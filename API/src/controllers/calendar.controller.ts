import { Request, Response } from "express";
import calendarRepository from "../repositories/calendar.repository";

export default class CalendarController {
    async findAll(req: Request, res: Response) {
        try {
            const calendar = await calendarRepository.retrieveAll();
            res.status(200).send({calendar});
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }
    async findAccessAll(req: Request, res: Response) {
        try {
            const calendar = await calendarRepository.retrieveAccessAll();
            res.status(200).send({calendar});
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }
    async changeRow(req: Request, res: Response) {
        try {
          const result = await calendarRepository.changeRow(req.body);
          res.status(200).send({});
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }
}
