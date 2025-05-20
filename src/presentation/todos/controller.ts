import { Request, Response } from "express";

const todos = [
    { id: 1, title: 'Todo 1', createdAt: new Date() },
    { id: 2, title: 'Todo 2', createdAt: new Date() },
    { id: 3, title: 'Todo 3', createdAt: new Date() },
]
export class TodoController {
    //* Dependency Injection
    constructor() { }

    public getTodos = (req: Request, res: Response) => {
        res.json(todos);
        return;
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;

        if (isNaN(id)) {
            res.status(404).json({ message: 'ID argument is not a number' });
            return
        }

        const todo = todos.find(todo => todo.id === id);
        if (!todo) {
            res.status(404).json({ message: 'Todo not found' });
            return
        }
        res.json(todo);
        return;
    }

    public createTodo = (req: Request, res: Response) => {
        const { title } = req.body
        if (!title) {
            res.status(400).json({ message: 'Title is required' });
            return;
        }

        const newTodo = {
            id: todos.length + 1,
            title,
            createdAt: new Date()
        }

        todos.push(newTodo)

        res.status(201).json({ message: 'Todo created', title });
        return;
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id
        const { title } = req.body

        if (isNaN(id)) {
            res.status(404).json({ message: 'ID argument is not a number' });
            return
        }

        if (!title) {
            res.status(400).json({ message: 'Title is required' });
            return;
        }

        const todo = todos.find((todo) => todo.id === id)
        if (!todo) {
            res.status(404).json({ message: `Todo with ID ${id} not found` });
            return
        }
        todo.title = title

        res.status(200).json({ message: 'Todo update' });
        return;
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id

        if (isNaN(id)) {
            res.status(404).json({ message: 'ID argument is not a number' });
            return
        }

        const todo = todos.find((todo) => todo.id === id)
        if (!todo) {
            res.status(404).json({ message: `Todo with ID ${id} not found` });
            return
        }
        todos.splice(todos.indexOf(todo), 1)

        res.status(200).json({ message: 'Todo deleted' });
        return;
    }
}