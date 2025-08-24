import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectdb from "./database/db.js";
import clientRouter from "./routes/clientRoutes.js";
import billRouter from "./routes/billRoutes.js";
import paymentRouter from "./routes/paymentsRoute.js";
import "./utils/createEmail.js";
  
dotenv.config();

const app = express();
app.use(express.json());

const whiteList = [process.env.FRONTEND_URL];
const corsOption = {
  origin: (origin, callback) => {
    if(whiteList.indexOf(origin !== -1 || !origin)){
      callback(null, true);
    }else{
      callback(new error("not allowed to cors"));
    }
  },
  optionsSuccessStatus: 200
}
app.use(cors(corsOption));

app.use("/client", clientRouter);
app.use("/bill", billRouter);
app.use("/payments", paymentRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  connectdb();
  console.log(`Server is running at ${PORT} port`);
});
