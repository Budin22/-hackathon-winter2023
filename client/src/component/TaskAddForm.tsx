import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import UserMultSelect from "./UserMultSelect";

export interface SingleTask {
  text: string;
  date: string;
  users: Array<string>;
}

interface ProjectAddFormProps {
  addNewTask: (task: SingleTask) => void;
}

export const TaskAddForm = (props: ProjectAddFormProps) => {
  const [users, setUsers] = useState<Array<string>>([]);
  const [taskText, setTaskText] = useState("");
  const [date, setDate] = useState("");

  const { addNewTask } = props;

  const addProject = () => {
    if (taskText !== null && date !== null) {
      const time = date.slice(11);
      const day = date.slice(8, 10);
      const month = date.slice(5, 7);
      const year = date.slice(0, 4);

      const currentDate = `${day}.${month}.${year}  ${time}`;
      addNewTask({ text: taskText, date: currentDate, users });
      console.log(taskText, currentDate, users);
      setDate("");
      setTaskText("");
      setUsers([]);
    }
  };

  console.log(users);

  const getUsers = (users: Array<string>) => {
    setUsers(users);
  };

  return (
    <Box display="flex" alignItems="center" gap={3}>
      <TextField
        id="outlined-multiline-static"
        label="Task description"
        sx={{ width: "100%", maxWidth: "30%" }}
        color="primary"
        multiline
        rows={1}
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <TextField
        sx={{ width: "100%", maxWidth: "20%" }}
        color="primary"
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <UserMultSelect getUsers={getUsers} usersList={users} />
      <Button
        variant="contained"
        type="button"
        onClick={addProject}
        sx={{
          maxWidth: "25%",
        }}
      >
        Add task
      </Button>
    </Box>
  );
};
