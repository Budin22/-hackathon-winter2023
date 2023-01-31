import React from "react";
import { Project } from "./Project";
import { Container, Typography } from "@mui/material";
import { ProjectAddForm } from "./ProjectAddForm";

export const ProjectList = () => {
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
      <ProjectAddForm />
      <Project />
    </Container>
  );
};
