import { Request } from "express";
import { UserType } from "../Models/User.model";

export interface CustomRequest<T = any> extends Request{
    user?: UserType;
    body: T;
}