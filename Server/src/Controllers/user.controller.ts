import { Request, Response } from "express";
import { User, UserType } from "../Models/User.model";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { CustomRequest } from "../Types/express";

type createUserReqBody = {
    name: string;
    username: string;
    password: string;
}
export const createUser = async (
    req : CustomRequest<createUserReqBody>, 
    res: Response
    ): Promise<void> =>
    {
    try {
        const { name, username, password } = req.body;
        if (!name || !username || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const checkuser = await User.findOne({ username });
        if (checkuser) {
            res.status(400).json({ message: "Username already exists" });
            return;
        }
        // Hash the password before saving
        const hashedpassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            username,
            password : hashedpassword
        });
        const cookie = jwt.sign({ id: newUser._id, username: newUser.username }, process.env.JWT_SECRET as string , {
            expiresIn: "7h" // Set the expiration time for the JWT
        });
        res
            .cookie(
                "token",
                cookie,
                {
                    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
                    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
                    sameSite: "strict", // Helps prevent CSRF attacks
                    maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie expiration time (7 days)
                })
            .status(201).json({ message: "User created successfully", user: newUser });

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}

interface LoginReqBody {
    username: string;
    password: string;
}

export const login = async (req: CustomRequest<LoginReqBody>, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: "Username and password are required" });
            return;
        }
        const user = await User.findOne({username})
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Compare the provided password with the stored hashed password
        // Assuming the password is stored in a field called 'password'
        // If you are using bcrypt, you would typically hash the provided password and compare it with
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid password" });
            return;
        }
        // Generate a JWT token
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET as string , {
            expiresIn: "7h" // Set the expiration time for the JWT
        });
        res.
        cookie("token", token, {
            httpOnly: true,} 
        ) // Prevents client-side JavaScript from accessing the cookie
        .status(200).json({ message: "Login successful", user: user });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}

export const chackauth = async (req: CustomRequest , res: Response): Promise<void> => {
    try {
        const user = req.user;
        const chackusername = await User.findOne({username: user?.username}).select("-password");
        if (!chackusername){
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        res.status(200).json(chackusername);

    } catch (error) {
        console.error("Error in authentication middleware:", error);
        res.status(401).json({ message: "Unauthorized" });
    }
}