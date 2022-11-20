require("express-async-errors");
import express from "express";
import notFoundHandler from "./middlewares/not-found-handler";
import errorHandler from "./middlewares/error-handler";
import cors from "cors";
import morgan from "morgan";
import weatherRouter from "./routes/weather-router";
import fs from "fs";

const app = express();

app.use(cors());
app.use(express.json());

const accessLogStream = fs.createWriteStream(__dirname + "/access.log", {
  flags: "a",
});

app.use(morgan("combined", { stream: accessLogStream }));

app.use(morgan("tiny"));

app.use("/weather", weatherRouter);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
