import { Request, Response } from "express";
import { prisma } from "../../data/postgresql";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodoController {
    //* Dependency Injection
    constructor() { }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany();
        res.status(200).json({
            severity: 'success',
            message: 'Todos found',
            data: todos
        });
        return;
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;

        if (isNaN(id)) {
            res.status(404).json({ message: 'ID argument is not a number' });
            return
        }

        const todo = await prisma.todo.findFirst({
            where: { id }
        })

        if (!todo) {
            res.status(400).json({
                severity: 'error',
                message: `Todo with ID ${id} not found`,
                data: null
            });
            return
        }
        res.status(200).json({
            severity: 'success',
            message: 'Todo found',
            data: todo
        });
        return;
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

        const todo = await prisma.todo.create({
            data: createTodoDto!
        })

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

        const checkTodo = await prisma.todo.findFirst({
            where: { id }
        })

        if (!checkTodo) {
            res.status(400).json({
                severity: 'error',
                message: `Todo with ID ${id} not found`,
                data: null
            });
            return
        }

        const todo = await prisma.todo.update({
            where: { id },
            data: updateTodoDto!.values
        })

        res.status(200).json({
            severity: 'error',
            message: 'Todo updated',
            data: todo.id
        });
        return;
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id

        if (isNaN(id)) {
            res.status(400).json({
                severity: 'error',
                message: 'ID argument is not a number',
                data: null
            });
            return
        }

        const checkTodo = await prisma.todo.findFirst({
            where: { id }
        })

        if (!checkTodo) {
            res.status(400).json({
                severity: 'error',
                message: `Todo with ID ${id} not found`,
                data: null
            });
            return
        }

        await prisma.todo.delete({
            where: { id }
        })

        res.status(200).json({
            severity: 'success',
            message: 'Todo deleted',
            data: null
        });
        return;
    }
}