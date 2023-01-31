import { Response, Request, NextFunction } from "express";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies;

    if ("token" in token) {
      return next();
    }
    res.status(401).json({ msg: "You need auth" });
  } catch (err) {
    console.log(err);
  }
};
