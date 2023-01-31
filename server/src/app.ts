import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

import userRouter from "./routers/project.router";
import authRouter from "./routers/user.router";
import { sessionKey } from "./config/keys";
import { verifyJWT } from "./middleware/verifyJWT";
import taskRouter from "./routers/task.router";

dotenv.config({ path: ".env" });
const app = express();

app.set("port", process.env.PORT);

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(
  session({
    secret: sessionKey,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/project", verifyJWT, userRouter);
app.use("/task", verifyJWT, taskRouter);
app.use("/user", authRouter);
export default app;
