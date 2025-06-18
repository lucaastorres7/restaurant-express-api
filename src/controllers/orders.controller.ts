import { knex } from "@/database/knex.js";
import { AppError } from "@/utils/AppError.js";
import { NextFunction, Request, Response } from "express";
import { z } from "zod/v4";

export class OrdersController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_session_id: z.number(),
        product_id: z.number(),
        quantity: z.number(),
      });

      const { table_session_id, product_id, quantity } = bodySchema.parse(
        req.body
      );

      const session = await knex<TablesSessionsRepository>("tables_sessions")
        .select()
        .where({ id: table_session_id })
        .first();

      if (!session) {
        throw new AppError("table session not found");
      }

      if (session.closed_at) {
        throw new AppError("this table is closed");
      }

      const product = await knex<ProductRepository>("products")
        .select()
        .where({ id: product_id })
        .first();

      if (!product) {
        throw new AppError("product not found");
      }

      await knex<OrderRepository>("orders").insert({
        table_session_id,
        product_id,
        quantity,
        price: product.price,
      });

      return res.status(201).json();
    } catch (err) {
      next(err);
    }
  }
}
