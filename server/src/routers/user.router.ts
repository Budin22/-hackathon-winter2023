import express from "express";
import { all, login, signup } from "../controllers/user.controller";
import { verifyJWT } from "../middleware/verifyJWT";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/all", verifyJWT, all);

export default router;
