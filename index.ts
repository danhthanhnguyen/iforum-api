import "dotenv/config";
import express from "express";
import { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./router/authRouter";
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/", authRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Home page");
});

const URI: string = `mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
mongoose
  .connect(URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`${error} did not connect!`);
  });
