import express from "express";
import { auth } from "../middleware/auth";
import {
  getQuestions,
  createQuestions,
} from "../controller/questionController";
const router = express.Router();

router.get("/", getQuestions);
router.post("/create", auth, createQuestions);

export default router;
