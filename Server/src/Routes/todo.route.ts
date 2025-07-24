import express from "express";
import { authMiddleware } from "../middlewares/auth.mid";
import { addtodo, deletetodo, editTodo, toggleTodoCompletion } from "../Controllers/todo.controller";

const route = express.Router();

route.post("/add", authMiddleware, addtodo);
route.delete("/delete", authMiddleware, deletetodo);
route.put("/togglecompletion", authMiddleware, toggleTodoCompletion);
route.post("/edit", authMiddleware, editTodo);

export default route;