import React from "react";
import { Container, Stack, Typography } from "@mui/material";
import { Form } from "./component/Form";
import { RegistrationForm } from "./component/RegistrationForm";

// import axios from "axios";
//
// type Project = {
//   projectName: string;
//   date: string;
//   author: string;
// };

export const App = () => {
  // const [text, setText] = useState<string>("");
  // const [projectList, setProjectList] = useState<Array<Project>>([]);
  //
  // useEffect(() => {
  //   const projects = axios
  //     .get("http://localhost:7070/project")
  //     .then((res) => res.data)
  //     .then((data) => setProjectList(data));
  // }, []);
  //
  // const addProject = () => {};

  return (
    <Container>
      <Stack>
        <RegistrationForm />
      </Stack>
    </Container>
  );
};
