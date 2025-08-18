import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectdb from "./database/db.js";
import clientRouter from "./routes/clientRoutes.js";
import billRouter from "./routes/billRoutes.js";
import "./utils/createEmail.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/client", clientRouter);
app.use("/bill", billRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  connectdb();
  console.log(`Server is running at ${PORT} port`);
});
