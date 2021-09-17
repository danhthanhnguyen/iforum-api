import { Request, Response } from "express";
import questionModel from "../model/questionModel";

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const totalQuestions: any = await questionModel.find();
    return res.json({
      data: totalQuestions,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const createQuestions = async (req: Request | any, res: Response) => {
  try {
    const question: object = req.body;
    const newQuestion = new questionModel({
      ...question,
      author: req.userId,
      createdAt: new Date().toISOString(),
    });
    await newQuestion.save();
    return res.json({
      data: newQuestion,
    });
  } catch (error: any) {
    return res.status(409).json({
      message: error.message,
    });
  }
};
