import { Router } from "express";
import { TodoController } from "./controller";
import { TodoDatasourceImpl } from "../../infraestructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infraestructure/repositories/todo.repository.impl";

export class TodoRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new TodoDatasourceImpl();
        const todoRepository = new TodoRepositoryImpl(datasource)

        const todosController = new TodoController(todoRepository);

        router.get('/todos', todosController.getTodos);
        router.get('/todos/:id', todosController.getTodoById);
        router.post('/todos', todosController.createTodo);
        router.put('/todos/:id', todosController.updateTodo);
        router.delete('/todos/:id', todosController.deleteTodo);

        return router;

    }
}