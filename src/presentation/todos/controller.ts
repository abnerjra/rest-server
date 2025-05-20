import { Request, Response } from "express";

export class TodoController {
    //* Dependency Injection
    constructor() { }

    public getTodos = (req: Request, res: Response) => {
        res.json([
            { id: 1, title: 'Todo 1', createdAt: new Date() },
            { id: 2, title: 'Todo 2', createdAt: new Date() },
            { id: 3, title: 'Todo 3', createdAt: new Date() },
        ]);
    }
}