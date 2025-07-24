import { CustomRequest } from "../Types/express";
import { Request, Response, NextFunction } from "express";
import { todo } from "../Models/Todo.model"; // adjust this path as per your project
import { List } from "../Models/List.model";
import { User } from "../Models/User.model"; // adjust this path as per your project

export const createList = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, description } = req.body;
        
        const userId = req.user?._id; // Assuming user is attached to req by auth middleware

        if (!name || !description) {
            res.status(400).json({ message: "Name and description are required" });
            return;
        }
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const newList = await List.create({
            name,
            description,
            todos: [] // Initialize with an empty array
        });

        user.lists.push(newList._id); // Assuming User model has a lists field
        await user.save();

        res.status(201).json({ message: "List created successfully", list: newList });
        return;
    } catch (error) {
        console.error("Error creating list:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteList = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { listId } = req.body;
        const userId = req.user?._id;

        if (!listId) {
            res.status(400).json({ message: "List ID is required" });
            return;
        }
        const deletedList = await List.findByIdAndDelete(listId);
        if (!deletedList) {
            res.status(404).json({ message: "List not found" });
            return;
        }
        // Remove all todos associated with this list
        await todo.deleteMany({ list: listId });
        // Optionally, remove the list from the user's lists array
        const user = await User.findById(userId);
        if(!user){
            res.status(404).json({ message: "User not found to remove list from users list" });
            return;
        }
        user.lists = user.lists.filter((listId)=> listId.toString() !== deletedList._id.toString());
        await user.save();

        res.status(200).json({ message: "List deleted successfully", list: deletedList, updatedUser: user });
        return;

    } catch (error) {
        console.error("Error deleting list:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}

export const getList = async (req: CustomRequest, res: Response): Promise<void> => {
    try{
        const { listId } = req.params;

        if (!listId) {
            res.status(400).json({ message: "something went wrong!" });
            return;
        }
        
        const todolist = await List.findById(listId).populate("todos");

        if (!todolist) {
            res.status(404).json({ message: "todo list not found..." });
            return;
        }
        res.status(200).json({ message: "Lists retrieved successfully", list: todolist });
    }catch (error) {
        console.error("Error retrieving lists:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllLists = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id; // Assuming user is attached to req by auth middleware

        if (!userId) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }

        const user = await User.findById(userId).populate("lists");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json({ message: "Lists retrieved successfully", lists: user.lists });
    } catch (error) {
        console.error("Error retrieving lists:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}