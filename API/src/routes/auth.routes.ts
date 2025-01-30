import { Router } from "express";
import AuthController from "../controllers/auth.controller";

class AuthRoutes {
    router = Router();
    controller = new AuthController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post("/", this.controller.loginAdmin);
    }
}

export default new AuthRoutes().router;
