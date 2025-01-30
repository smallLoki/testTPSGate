import { Router } from "express";
import CalendarController from '../controllers/calendar.controller';

class HomeRoutes {
    router = Router();
    controller = new CalendarController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
      this.router.get("/", this.controller.findAccessAll);
    }
}

export default new HomeRoutes().router;
