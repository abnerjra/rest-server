import { Router } from "express";
import { TodoController } from "./controller";

export class TodoRoutes {
    static get routes(): Router {
        const router = Router();

        const todosController = new TodoController();

        router.get('/todos', todosController.getTodos);
        router.get('/todos/:id', todosController.getTodoById);
        router.post('/todos', todosController.createTodo);
        router.put('/todos/:id', todosController.updateTodo);
        router.delete('/todos/:id', todosController.deleteTodo);

        return router;

    }
}