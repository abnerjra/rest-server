import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodoController {
    //* Dependency Injection
    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await this.todoRepository.getAll();

        res.status(200).json({
            severity: 'success',
            message: 'Todos found',
            data: todos
        });
        return;
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;

        try {
            const todo = await this.todoRepository.findById(id);
            res.status(200).json({
                severity: 'success',
                message: 'Todo found',
                data: todo
            });
            return;
        } catch (error) {
            res.status(400).json({
                severity: 'error',
                message: error,
                data: null
            });
            return;
        }
    }

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body)

        if (error) {
            res.status(400).json({
                severity: 'error',
                message: error,
                data: null
            });
            return;
        }

        const todo = await this.todoRepository.create(createTodoDto!);

        res.status(201).json({
            severity: 'error',
            message: 'Todo created',
            data: todo.id
        });
        return;
    }

    public updateTodo = async (req: Request, res: Response) => {
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

        const updateTodo = await this.todoRepository.update(updateTodoDto!);

        res.status(200).json({
            severity: 'error',
            message: 'Todo updated',
            data: updateTodo.id
        });
        return;
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id

        try {
            const deleteTodo = await this.todoRepository.delete(id);

            res.status(200).json({
                severity: 'success',
                message: 'Todo deleted',
                data: deleteTodo
            });
            return;
        } catch (error) {
            res.status(400).json({
                severity: 'error',
                message: error,
                data: null
            });
            return;
        }
    }
}