import express, {Application, Request, Response} from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./routes";
import * as core from "express-serve-static-core";

export default class Server {
    constructor(app: Application) {
        this.config(app);
        new Routes(app);
    }

    private config(app: Application): void {
        const corsOptions: CorsOptions = {
            credentials: true,
            origin: "*"
        };

        app.use(cors(corsOptions))
            .use(function(req: Request, res: Response, next: core.NextFunction) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Token");
                res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
                res.header("Authorization", "*");
                next();
            })
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
    }
}
