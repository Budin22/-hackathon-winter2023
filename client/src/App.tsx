import React from "react";
import { Container, Stack } from "@mui/material";
import { RegistrationForm } from "./component/RegistrationForm";
import { ProjectList } from "./component/ProjectList";

export const App = () => {
  return (
    <Container>
      <Stack gap={3}>
        <ProjectList />
        <RegistrationForm />
      </Stack>
    </Container>
  );
};
