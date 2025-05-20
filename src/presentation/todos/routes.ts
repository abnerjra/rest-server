import { Router } from "express";
import { TodoController } from "./controller";

export class TodoRoutes {
    static get routes(): Router {
        const router = Router();

        const todosController = new TodoController();

        router.get('/api/todos', todosController.getTodos);

        return router;

    }
}