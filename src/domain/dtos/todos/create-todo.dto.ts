export class CreateTodoDto {

    private constructor(
        public readonly title: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {
        const { title } = props
        
        if (!title) return ['Title is required']


        return [undefined, new CreateTodoDto(title)]
    }
}