import express from "express";
import { all, create } from "../controllers/project.controller";

const router = express.Router();

router.get("/", all);
router.post("/create", create);

export default router;
