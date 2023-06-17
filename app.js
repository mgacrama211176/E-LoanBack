import express, { response } from "express";
import path from "path";

import __dirname from "./dirname.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";

//import Routes
import newAdmin from "./routes/Admin.Route.js";
import authRoute from "./routes/Auth.Route.js";
import transactionRoute from "./routes/transactionRouter.js";
import PaymentRoute from "./routes/paymentRouter.js";
import investorRoute from "./routes/InvestorRoute.js";
import HandlersRoute from "./routes/handlersRoute.js";

//DrenchWorks
import clientsRouter from "./routes/clientsRouter.js";

//connecting to DB
import connectdb from "./connectdb.js";
import errorController from "./controller/Error.controller.js";

import "dotenv/config";

connectdb(
  "mongodb+srv://admin:admin123@e-loan.c4ipwsl.mongodb.net/?retryWrites=true&w=majority",
  "E-Loan"
);

const app = express();
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/api/clients", clientsRouter);
app.use("/api/transactions", transactionRoute);
app.use("/api/payments", PaymentRoute);
app.use("/api/investor", investorRoute);
app.use("/api/handlers", HandlersRoute);

app.use("/api/v1/user", newAdmin);
app.use("/api/v1/auth", authRoute);

// error controller
app.use(errorController);

// app.use(function (req, res, next) {
//   res.status(404).json({message: "We couldn't find what you were looking for 😞"})
// })

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json(err);
});

export default app;
