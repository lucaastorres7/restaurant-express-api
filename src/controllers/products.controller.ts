import { NextFunction, Request, Response } from "express";
import { knex } from "@/database/knex.js";
import { z } from "zod/v4";
import { AppError } from "@/utils/AppError.js";

export class ProductsController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.query;

      const products = await knex<ProductRepository>("products")
        .select()
        .whereLike("name", `%${name ?? ""}%`)
        .orderBy("name");

      return res.json(products);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z
          .string({ error: "name field is required" })
          .trim()
          .min(3, { error: "name must have at least 3 characters" }),
        price: z
          .number({ error: "price field is required" })
          .gt(0, { error: "price must be greater than 0" }),
      });
      const { name, price } = bodySchema.parse(req.body);

      await knex<ProductRepository>("products").insert({ name, price });

      return res.status(201).json();
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

      const bodySchema = z.object({
        name: z
          .string({ error: "name field is required" })
          .trim()
          .min(3, { error: "name must have at least 3 characters" }),

        price: z
          .number({ error: "price field is required" })
          .gt(0, { error: "price must be greater than 0" }),
      });

      const { name, price } = bodySchema.parse(req.body);

      const product = await knex<ProductRepository>("products")
        .select()
        .where({ id })
        .first();

      if (!product) {
        throw new AppError("product not found");
      }

      await knex<ProductRepository>("products")
        .update({ name, price, updated_at: knex.fn.now() })
        .where({ id });

      return res.json();
    } catch (err) {
      next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { error: "id must be a number" })
        .parse(req.params.id);

      const product = await knex<ProductRepository>("products")
        .select()
        .where({ id })
        .first();

      if (!product) {
        throw new AppError("product not found");
      }

      await knex<ProductRepository>("products").delete().where({ id });

      return res.json();
    } catch (err) {
      next(err);
    }
  }
}
