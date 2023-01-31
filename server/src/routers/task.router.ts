import express from "express";
import { all, create, remove, update } from "../controllers/task.controller";

const router = express.Router();

router.get("/", all);
router.post("/create", create);
router.patch("/update", update);
router.delete("/delete", remove);

export default router;
