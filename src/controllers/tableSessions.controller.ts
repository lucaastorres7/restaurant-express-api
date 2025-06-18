import { knex } from "@/database/knex.js";
import { AppError } from "@/utils/AppError.js";
import { Request, Response, NextFunction } from "express";
import { z } from "zod/v4";

export class TablesSessionsController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_id: z.number(),
      });

      const { table_id } = bodySchema.parse(req.body);

      const session = await knex<TablesSessionsRepository>("tables_sessions")
        .select()
        .where({ table_id })
        .orderBy("opened_at", "desc")
        .first();

      if (session && !session.closed_at) {
        throw new AppError("this table is already open");
      }

      await knex<TablesSessionsRepository>("tables_sessions").insert({
        table_id,
        opened_at: knex.fn.now(),
      });

      return res.status(201).json();
    } catch (err) {
      next(err);
    }
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const sessions = await knex<TablesSessionsRepository>("tables_sessions")
        .select()
        .orderBy("closed_at");

      return res.json(sessions);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { error: "id must be a number" })
        .parse(req.params.id);

      const session = await knex<TablesSessionsRepository>("tables_sessions")
        .select()
        .where({ id })
        .first();

      if (!session) {
        throw new AppError("session table not found");
      }

      if (session.closed_at) {
        throw new AppError("this session is already closed");
      }

      await knex<TablesSessionsRepository>("tables_sessions")
        .update({
          closed_at: knex.fn.now(),
        })
        .where({ id });

      return res.json();
    } catch (err) {
      next(err);
    }
  }
}
