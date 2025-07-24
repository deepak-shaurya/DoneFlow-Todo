import { Request, Response, NextFunction, RequestHandler } from "express";

export const TryCatch = (fn: (req: Request, res: Response, next: NextFunction) => any): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
