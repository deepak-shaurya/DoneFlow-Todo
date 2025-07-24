import { CustomRequest } from "../Types/express";
import { Request, Response, NextFunction } from "express";
import { todo } from "../Models/Todo.model"; // adjust this path as per your project
import { List } from "../Models/List.model";

export const addtodo = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { task , listId: list} = req.body;
        const userId = req.user?._id; // Assuming user is attached to req by auth middleware
    
        if (!task) {
        res.status(400).json({ message: "Todo task is required" });
        return;
        }
        if (!list) {
            res.status(400).json({ message: "List ID is required" });
            return;
        }
        // Check if the list exists
        const existinglistcheck = await List.findById(list);
        if (!existinglistcheck) {
            res.status(404).json({ message: "List not found" });
            return;
        }
        const newTodo = await todo.create({
            task,
            completed: false, // Default to not completed
            list: existinglistcheck._id, // Associate the todo with the list

        });
        // Add the new todo to the list's todos array
        existinglistcheck.todos.push(newTodo._id);
        await existinglistcheck.save();

        res.status(201).json({ message: "Todo added successfully", todo: newTodo });
    } catch (error) {
        console.error("Error adding todo:", error);
        res.status(500).json({ message: "Internal server error"  });
    }
};

export const deletetodo = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const {todoId, listId} = req.body;
        if (!todoId) {
            res.status(400).json({ message: "Todo ID is required" });
            return;
        }
        const deletedTodo = await todo.findByIdAndDelete(todoId)
        if (!deletedTodo) {
            res.status(404).json({ message: "Todo not found" });
            return;
        }
        const list = await List.findOne({_id: listId});
        if(!list) {
            res.status(404).json({ message: "List not found" });
            return;
        }
        // Remove the todo from the list's todos array
        list.todos = list.todos.filter((todoId) => todoId.toString() !== deletedTodo._id.toString());
        await list.save();
        res.status(200).json({ message: "Todo deleted successfully", todo: deletedTodo, updatedlist: list })

    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}

export const toggleTodoCompletion = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { todoId } = req.body;
        if (!todoId){
            res.status(400).json({ message: "Todo ID is required" });
            return;
        }
        const todoItem = await todo.findById(todoId);
        if (!todoItem) {
            res.status(404).json({ message: "Todo not found" });
            return;
        }
        // Toggle the completion status
        todoItem.completed = !todoItem.completed;
        await todoItem.save();
        res.status(200).json(todoItem);
        return;
    } catch (error) {
        console.error("Error toggling todo completion:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}

export const editTodo = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { todoId, task } = req.body;
        if (!todoId || !task) {
            res.status(400).json({ message: "Todo ID and task are required" });
            return;
        }
        const todoItem = await todo.findById(todoId);
        if (!todoItem) {
            res.status(404).json({ message: "Todo not found" });
            return;
        }
        // Update the task
        todoItem.task = task;
        await todoItem.save();
        res.status(200).json({ message: "Todo updated successfully", todo: todoItem });
    } catch (error) {
        console.error("Error editing todo:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}