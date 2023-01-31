import React, { useEffect, useState } from "react";
import { Project } from "./Project";
import { Container, Typography } from "@mui/material";
import { ProjectAddForm, SingleProject } from "./ProjectAddForm";
import axios from "axios";
import { Port } from "./port";

export interface FetchedProject {
  projectName: string;
  date: string;
  author: string;
  _id: string;
}
export const ProjectList = () => {
  const [projects, setProjects] = useState<Array<FetchedProject>>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:${Port}/project/`, { withCredentials: true })
      .then((res) => res.data)
      .then((data) => {
        setProjects(data.data);
      })
      .catch((err) => {
        if (err.response?.status > 200) {
          console.log("error with get users");
        }
      });
  }, []);

  const addNewProject = (project: SingleProject) => {
    axios
      .post(`http://localhost:${Port}/project/create`, project, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((data) => {
        setProjects(data.data);
      })
      .catch((err) => {
        if (err.response?.status > 200) {
          console.log("error with get users");
        }
      });
  };

  const removeProject = (projectId: string) => {
    axios
      .delete(`http://localhost:${Port}/project/delete/${projectId}`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((data) => {
        setProjects(data.data);
      })
      .catch((err) => {
        if (err.response?.status > 200) {
          console.log("error with get users");
        }
      });
  };

  console.log(projects);
  return (
    <Container>
      <Typography
        component="h2"
        variant="h2"
        textAlign="center"
        fontWeight="Bold"
        color="steelblue"
      >
        Project list
      </Typography>
      <ProjectAddForm addNewProject={addNewProject} />
      {!!projects.length &&
        projects.map((project) => (
          <Project
            key={project._id}
            project={project}
            removeProject={removeProject}
          />
        ))}
    </Container>
  );
};
