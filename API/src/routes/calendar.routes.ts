import { Router } from "express";
import CalendarController from "../controllers/calendar.controller";

class CalendarRoutes {
    router = Router();
    controller = new CalendarController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {

        this.router.get("/", this.controller.findAll);
        this.router.post("/", this.controller.changeRow);
    }
}

export default new CalendarRoutes().router;
