import express from "express";
import dotenv from "dotenv";
import { routes } from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use(routes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at https://localhost:${process.env.PORT}`);
});
