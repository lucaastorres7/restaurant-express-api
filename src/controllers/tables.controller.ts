import { knex } from "@/database/knex.js";
import { Request, Response, NextFunction } from "express";

export class TablesController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const tables = await knex<TableRepository>("tables")
        .select()
        .orderBy("table_number");

      return res.json(tables);
    } catch (err) {
      next(err);
    }
  }
}
