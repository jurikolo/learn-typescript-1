import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Todo } from '../models/todo';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const text = (req.body as { text: string }).text;
    const newTodo = new Todo(Math.random().toString(), text);

    TODOS.push(newTodo);

    res.status(201).json({ message: 'Create the todo', createTodo: newTodo });
};

export const getTodos: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    res.json({ todos: TODOS });
}

export const updateTodo: RequestHandler<{ id: string }> = (req: Request, res: Response, next: NextFunction) => {
    const todoId = req.params.id;
    const updatedText = (req.body as { text: string }).text;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

    if (todoIndex < 0) {
        throw new Error('Cannot find entry');
    }

    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

    res.json({ message: 'Updated', updatedTodo: TODOS[todoIndex] });
}

export const deleteTodo: RequestHandler<{ id: string }> = (req: Request, res: Response, next: NextFunction) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

    if (todoIndex < 0) {
        throw new Error('Cannot find entry');
    }

    TODOS.splice(todoIndex, 1);

    res.json({ message: 'Todo deleted' });
}
