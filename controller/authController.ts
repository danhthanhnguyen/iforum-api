import { Request, Response } from "express";
import authModel from "../model/authModel";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    const password: string = req.body.password;
    const user: any = await authModel.findOne({ email });
    const isAuth: boolean = await bcrypt.compare(password, user.password);
    if (!user || !isAuth) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    let token: string = jwt.sign(
      {
        id: user._id,
        email: email,
      },
      <Secret>process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );
    return res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    const password: string = req.body.password;
    const isUser: any = await authModel.findOne({ email });
    if (isUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const salt: string = await bcrypt.genSalt(10);
    const hashPassword: string = await bcrypt.hash(password, salt);
    const user = await authModel.create({
      email: email,
      password: hashPassword,
    });
    let token: string = jwt.sign(
      {
        id: user._id,
        email: email,
      },
      <Secret>process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );
    return res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
