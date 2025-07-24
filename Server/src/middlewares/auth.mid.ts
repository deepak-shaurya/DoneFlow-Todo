import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { User } from "../Models/User.model" // adjust this path as per your project

interface JwtPayload {
  username: string
  iat?: number
  exp?: number
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  try {
    const token = req.cookies?.token // assuming cookie is named 'token'

    if (!token) {
      res.status(401).json({ message: "No cookie or token provided" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
    const username = decoded.username

    if (!username) {
      res.status(400).json({ message: "Invalid token payload" });
      return;
    }

    const user = await User.findOne({ username })

    if (!user) {
      res.status(403).json({ message: "User not found" });
      return;
    }

    // Optional: attach user to req for later use
    (req as any).user = user

    next()
  } catch (err) {
    console.error("Auth Error:", err)
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
}
