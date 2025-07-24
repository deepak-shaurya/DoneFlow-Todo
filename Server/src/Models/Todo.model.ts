import { Schema, model} from "mongoose";

const todoSchema = new Schema({
    task: {
        type: String,
        required: true,   
    },
    completed: {
        type: Boolean,
        default: false,
    },
    list:{
        type: Schema.Types.ObjectId,
        ref: "List",
        required: true, // Assuming each todo belongs to a list
    }
},{
    timestamps: true,
})

export const todo = model("Todo", todoSchema);
export type TodoType = {
    _id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}
