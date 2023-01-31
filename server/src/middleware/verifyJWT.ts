import { Response, Request, NextFunction } from "express";
import JWT from "jsonwebtoken";
import { jwtSecret } from "../config/keys";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;

    if (typeof token === "string") {
      const decoded = JWT.decode(token);
      if (decoded === null || typeof decoded === "string") {
        return res.status(401).json({ msg: "You need auth" });
      }
      const { email, id } = decoded;
      const freshToken = JWT.sign({ email, id }, jwtSecret, {
        expiresIn: 60 * 60,
      });

      res.cookie("token", freshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
      return next();
    }
    res.status(401).json({ msg: "You need auth" });
  } catch (err) {
    console.log(err);
  }
};
