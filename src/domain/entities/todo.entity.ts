export class TodoEntity {
    constructor(
        public id: number,
        public title: string,
        public completedAt: Date | null
    ) {

    }

    get isCompleted() {
        return !!this.completedAt
    }

    /**
     * Creates a `TodoEntity` instance from a plain object.
     *
     * @param obj - Object containing the properties needed to create the entity.
     * @param obj.id - Unique identifier for the task. Required.
     * @param obj.title - Title or description of the task. Required.
     * @param obj.completedAt - Completion date (optional). If provided, must be a valid date.
     *
     * @throws {string} If either `id` or `title` is missing, or if `completedAt` is not a valid date.
     *
     * @returns A new `TodoEntity` instance with the provided data.
     */
    public static fromObject(obj: { [key: string]: any }): TodoEntity {
        const { id, title, completedAt } = obj;

        if (!id) throw 'ID is required';
        if (!title) throw 'Title is required';

        let newCompletedAt;
        if (completedAt) {
            newCompletedAt = new Date(completedAt);
            if (isNaN(newCompletedAt.getTime())) throw 'CompletedAt is not a valid date';
        }

        return new TodoEntity(id, title, completedAt);
    }
}