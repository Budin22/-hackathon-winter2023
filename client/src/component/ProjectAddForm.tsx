import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { UserSelect } from "./UserSelect";

export interface SingleProject {
  projectName: string;
  date: string;
  author: string;
}

interface ProjectAddFormProps {
  addNewProject: (project: SingleProject) => void;
}

export const ProjectAddForm = (props: ProjectAddFormProps) => {
  const [user, setUser] = useState("");
  const [projectName, setProjectName] = useState("");
  const [date, setDate] = useState("");

  const { addNewProject } = props;

  const addProject = () => {
    if (projectName !== null && date !== null) {
      const time = date.slice(11);
      const day = date.slice(8, 10);
      const month = date.slice(5, 7);
      const year = date.slice(0, 4);

      const currentDate = `${day}.${month}.${year}  ${time}`;
      addNewProject({ projectName, date: currentDate, author: user });
      console.log(projectName, currentDate, user);
      setDate("");
      setProjectName("");
      setUser("");
    }
  };

  const getUser = (user: string) => {
    setUser(user);
  };
  return (
    <Box display="flex" alignItems="center" gap={3}>
      <TextField
        id="outlined-multiline-static"
        label="Project name"
        sx={{ width: "100%", maxWidth: "40%" }}
        color="primary"
        multiline
        rows={1}
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <TextField
        sx={{ width: "100%", maxWidth: "20%" }}
        color="primary"
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <UserSelect getUser={getUser} user={user} />
      <Button
        variant="contained"
        type="button"
        onClick={addProject}
        sx={{
          maxWidth: "25%",
        }}
      >
        Add project
      </Button>
    </Box>
  );
};
