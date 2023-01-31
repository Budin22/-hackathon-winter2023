import express from "express";
import {
  all,
  login,
  logout,
  signup,
  userIsLogin,
} from "../controllers/user.controller";
import { verifyJWT } from "../middleware/verifyJWT";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", logout);
router.get("/all", verifyJWT, all);
router.get("/userIsLogin", userIsLogin);

export default router;
