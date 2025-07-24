export type TodoType = {
    _id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type ListType = {
    _id: string;
    name: string;
    description: string;
    todos: string[];
    createdAt: Date;
    updatedAt: Date;
};
export type ListWithTodosType = {
    _id: string;
    name: string;
    description: string;
    todos: TodoType[];
    createdAt: Date;
    updatedAt: Date;
}


export type UserType = {
    _id: string;
    name: string;
    username: string;
    password: string;
    lists: ListType[]; // Array of List IDs
}

export type AuthBody = {
    name?: string; // Optional for login
    username: string;
    password: string;
}