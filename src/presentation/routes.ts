import { Router } from "express";
import { TodoRoutes } from "./todos/routes";

export class AppRoutes {
    static get routes(): Router {
        const prefix = '/api';
        const router = Router();

        router.use(prefix, TodoRoutes.routes);

        return router;

    }
}