import express from "express";
import { all, create, remove, update } from "../controllers/task.controller";

const router = express.Router();

router.get("/all/:id", all);
router.post("/create", create);
router.put("/update", update);
router.delete("/delete/:projectId/:taskId", remove);

export default router;
