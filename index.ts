import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

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
