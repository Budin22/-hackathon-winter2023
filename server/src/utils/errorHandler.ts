import { Response } from "express";

export const errorHandler = (res: Response, error: any) => {
  res
    .status(500)
    .json({ success: false, msg: error.message ? error.message : error });
};
