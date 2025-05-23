import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoDatasource {
    // todo: pagination
    abstract getAll(): Promise<TodoEntity[]>;
    
    abstract create(createTodoDto: CreateTodoDto) :Promise<TodoEntity>;

    abstract findById(id: number): Promise<TodoEntity>;

    abstract update(updateTodoDto: UpdateTodoDto) : Promise<TodoEntity>;

    abstract delete(id: number): Promise<TodoEntity>;
}