import express from "express";
import { all, create, remove } from "../controllers/project.controller";

const router = express.Router();

router.get("/", all);
router.post("/create", create);
router.delete("/delete/:id", remove);

export default router;
