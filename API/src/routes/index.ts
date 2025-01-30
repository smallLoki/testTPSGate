import { Application } from "express";
import homeRoutes from "./home.routes";
import AuthRoutes from "./auth.routes";
import CalendarRoutes from './calendar.routes';


export default class Routes {
    constructor(app: Application) {

        app.use("/api", homeRoutes);
        app.use("/api/login", AuthRoutes);
        app.use("/api/calendar", CalendarRoutes);
    }
}
