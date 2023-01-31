import { Request, Response } from "express";

import Project from "../models/Project";
import { errorHandler } from "../utils/errorHandler";

export const all = async (req: Request, res: Response) => {
  try {
    const allProject = await Project.find();

    if (!allProject) {
      return res.status(401).json({ msg: "Problem with to find all projects" });
    }

    res.status(200).json({ data: allProject });
  } catch (err) {
    errorHandler(res, err);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { projectName, date, author } = req.body;

    const project = await Project.create({ projectName, date, author });
    if (!project) {
      return res.status(401).json({ msg: "Project was not created" });
    }

    const allProjects = await Project.find();

    if (!allProjects) {
      return res.status(401).json({ msg: "Projects was not get" });
    }

    res.status(200).json({
      data: allProjects,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.body;

    const removedProject = await Project.findByIdAndDelete(projectId);

    if (!removedProject) {
      return res.status(401).json({ msg: "Project was not delete" });
    }

    const projects = await Project.find();

    res.status(200).json({
      data: projects,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};
