import { Schema, model } from "mongoose";
import { ListType } from "./List.model";

const userSchema = new Schema({
    name:{
        required: true,
        type: String,

    },
    username:{
        required: true,
        type: String,
        unique: true,
    },
    password:{
        required: true,
        type: String,
    },
    lists:[
        {
            type: Schema.Types.ObjectId,
            ref: "List",
        }
    ]
});

export const User = model("User", userSchema);

export type UserType = {
    _id: string;
    name: string;
    username: string;
    password: string;
    lists: ListType[]; // Array of List IDs
}