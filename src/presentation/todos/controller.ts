import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";

export class TodoController {
    //* Dependency Injection
    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    public getTodos = (req: Request, res: Response) => {

        new GetTodos(this.todoRepository).execute()
            .then((todos) => {
                res.status(200).json({
                    severity: 'success',
                    message: 'Todos found',
                    data: todos
                });
            })
            .catch((error) => {
                res.status(400).json({
                    severity: 'error',
                    message: error,
                    data: null
                });
            });
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;
        new GetTodo(this.todoRepository).execute(id)
            .then((todo) => {
                res.status(200).json({
                    severity: 'success',
                    message: 'Todo found',
                    data: todo
                });
            })
            .catch((error) => {
                res.status(400).json({
                    severity: 'error',
                    message: error,
                    data: null
                });
            });
    }

    public createTodo = (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body)

        if (error) {
            res.status(400).json({
                severity: 'error',
                message: error,
                data: null
            });
            return;
        }

        new CreateTodo(this.todoRepository).execute(createTodoDto!)
            .then((todo) => {
                res.status(201).json({
                    severity: 'success',
                    message: 'Todo created',
                    data: todo.id
                });
            })
            .catch((error) => {
                res.status(400).json({
                    severity: 'error',
                    message: error,
                    data: null
                });
            });
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id

        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id })

        if (error) {
            res.status(404).json({
                severity: 'error',
                message: error,
                data: null
            });
            return
        }

        new UpdateTodo(this.todoRepository).execute(updateTodoDto!)
            .then((todo) => {
                res.status(200).json({
                    severity: 'success',
                    message: 'Todo updated',
                    data: todo
                });
            })
            .catch((error) => {
                res.status(400).json({
                    severity: 'error',
                    message: error,
                    data: null
                });
            });
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id

        new DeleteTodo(this.todoRepository).execute(id)
            .then((deleteTodo) => {
                res.status(200).json({
                    severity: 'success',
                    message: 'Todo deleted',
                    data: deleteTodo
                });
            })
            .catch((error) => {
                res.status(400).json({
                    severity: 'error',
                    message: error,
                    data: null
                });
            });
    }
}