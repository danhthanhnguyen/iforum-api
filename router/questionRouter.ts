import express from "express";
import { getQuestions } from "../controller/questionController";
const router = express.Router();

router.get("/", getQuestions);

export default router;
