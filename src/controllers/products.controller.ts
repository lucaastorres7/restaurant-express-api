import { NextFunction, Request, Response } from "express";

export class ProductsController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json({ message: "ok" });
    } catch (err) {
      next(err);
    }
  }
}
