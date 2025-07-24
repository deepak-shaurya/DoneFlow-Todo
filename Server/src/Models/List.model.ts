import {Schema , model} from "mongoose";
import { TodoType} from "./Todo.model";

const listSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    todos: [{
        type: Schema.Types.ObjectId,
        ref: "Todo",
    }],
    
}, {
    timestamps: true,
});

export const List = model("List", listSchema);

export type ListType = {
    _id: string;
    name: string;
    description: string;
    todos: TodoType[];
    createdAt: Date;
    updatedAt: Date;
};