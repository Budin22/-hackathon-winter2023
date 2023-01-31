import React from "react";
import { RegistrationForm } from "./component/RegistrationFrom";
import { Typography } from "@mui/material";
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
    <>
      <Typography
        sx={{ textAlign: "center", width: "100%" }}
        component="h2"
        variant="h4"
        color="steelblue"
      >
        Good start
      </Typography>
      {/*<RegistrationForm />;*/}
    </>
  );
};
