import React, { useRef } from "react";
import { Box, Button, TextField } from "@mui/material";

export const ProjectAddForm = () => {
  const projectName = useRef<HTMLInputElement>();
  const date = useRef<HTMLInputElement>();

  const addProject = () => {
    if (projectName !== null && date !== null) {
      const time = date.current?.value.slice(11);
      const day = date.current?.value.slice(8, 10);
      const month = date.current?.value.slice(5, 7);
      const year = date.current?.value.slice(0, 4);

      const currentDate = `${day}.${month}.${year}  ${time}`;
      const currentProjectName = projectName.current?.value;

      console.log(currentProjectName, currentDate);
    }
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
        inputRef={projectName}
      />
      <TextField
        sx={{ width: "100%", maxWidth: "20%" }}
        color="primary"
        type="datetime-local"
        inputRef={date}
      />
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
