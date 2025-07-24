import express from "express";
import { authMiddleware } from "../middlewares/auth.mid";
import { createList, deleteList, getAllLists, getList } from "../Controllers/list.controller";

const route = express.Router();

route.post("/create", authMiddleware, createList);
route.delete("/delete", authMiddleware, deleteList);
route.get("/get/:listId", authMiddleware, getList);
route.get("/getAll", authMiddleware, getAllLists)

export default route;