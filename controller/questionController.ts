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
