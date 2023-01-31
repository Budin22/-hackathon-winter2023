import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/User";
import { jwtSecret } from "../config/keys";
import { errorHandler } from "../utils/errorHandler";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(401).json({ msg: "Email is exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashPassword });

    res.status(200).json({ msg: "User created" });
  } catch (err) {
    errorHandler(res, err);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Email does not exist" });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = JWT.sign({ email, id: user._id }, jwtSecret, {
        expiresIn: 60 * 60,
      });

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });

      res.status(200).json({
        email,
      });
    }
  } catch (err) {
    errorHandler(res, err);
  }
};

export const isLogin = async (req: Request, res: Response) => {
  try {
    const { token } = req.cookies;

    if (typeof token === "string") {
      const decoded = JWT.decode(token);
      if (decoded === null || typeof decoded === "string") {
        return res.status(401).json({ msg: "You need auth" });
      }
      const { email } = decoded;
      res.status(200).json({ email }).end();
    } else {
      res.status(402).json({ msg: "You need auth" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const all = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(401).json({ msg: "Users not found" });
    }

    res.status(200).json({
      data: users,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const token = JWT.sign({ email: "boo", id: "2" }, jwtSecret, {
      expiresIn: 1,
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1,
    });

    res.status(200).json({
      msg: "you are logout",
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

export const userIsLogin = async (req: Request, res: Response) => {
  try {
    const { token } = req.cookies;

    if (typeof token === "string") {
      const decoded = JWT.decode(token);
      if (decoded === null || typeof decoded === "string") {
        return res.status(401).json({ msg: "You need auth" });
      }
      const { email } = decoded;

      res.status(200).json({ email });
    }
    res.status(401).json({ msg: "You need auth" });
  } catch (err) {
    console.log(err);
  }
};
