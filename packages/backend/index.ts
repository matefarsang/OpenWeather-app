import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import mongoose from "mongoose";

const port = process.env.PORT || 3001;
const mongoDbUrl = process.env.MONGO_URL || "mongodb://db:27017";

mongoose
  .connect(`${mongoDbUrl}`, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err: unknown) => console.log(err));

const server = async (): Promise<void> => {
  app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
  });
};

server().catch(console.error);
