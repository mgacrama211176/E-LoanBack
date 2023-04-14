import express, { response } from "express";
import path from "path";

import __dirname from "./dirname.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";

//import Routes
import newAdmin from "./routes/Admin.Route.js";
import authRoute from "./routes/Auth.Route.js";
import newProduct from "./routes/newProduct.js";
import login from "./routes/login.js";
import SearchRoute from "./routes/search.js";

//DrenchWorks
import clientsRouter from "./routes/clientsRouter.js";
import inventoryRouter from "./routes/inventoryRouter.js";

//connecting to DB
import connectdb from "./connectdb.js";
import errorController from "./controller/Error.controller.js";
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
app.use("/product", newProduct);
app.use("/login", login);
app.use("/search", SearchRoute);
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
