import { TablesSessionsController } from "@/controllers/tableSessions.controller.js";
import { Router } from "express";

const tablesSessionsRoutes = Router();
const tablesSessionsController = new TablesSessionsController();

tablesSessionsRoutes.post("/", tablesSessionsController.create);
tablesSessionsRoutes.get("/", tablesSessionsController.index);

export { tablesSessionsRoutes };
