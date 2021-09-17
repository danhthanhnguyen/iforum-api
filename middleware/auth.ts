import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const auth = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]; // get token
  let decodedData: JwtPayload;
  if (!token) {
    return res.status(403).send("Not authenticated");
  }
  try {
    decodedData = await (<JwtPayload>(
      jwt.verify(token, <Secret>process.env.SECRET)
    ));
    req.userId = decodedData?.id;
  } catch (error) {
    return res.status(401).send("Invalid token");
  }

  return next();
};
