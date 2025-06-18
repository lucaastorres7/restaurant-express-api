import { TablesController } from "@/controllers/tables.controller.js";
import { Router } from "express";

const tablesRoutes = Router();
const tablesController = new TablesController();

tablesRoutes.get("/", tablesController.index);

export { tablesRoutes };
