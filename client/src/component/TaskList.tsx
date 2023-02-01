import React, { useEffect, useState } from "react";
import { Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import { Port } from "./port";
import { SingleTask, TaskAddForm } from "./TaskAddForm";
import { Task } from "./Task";

export interface FetchedTask {
  text: string;
  date: string;
  users: Array<string>;
  status: string;
  _id: string;
}

interface Props {
  projectId: string;
}

export const TaskList = ({ projectId }: Props) => {
  const [tasks, setTasks] = useState<Array<FetchedTask>>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:${Port}/task/all/${projectId}`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((data) => {
        setTasks(data.data.reverse());
      })
      .catch((err) => {
        if (err.response?.status > 200) {
          console.log("error with get projects");
        }
      });
  }, [projectId]);

  const addNewTask = (task: SingleTask) => {
    const { text, users, date } = task;
    axios
      .post(
        `http://localhost:${Port}/task/create`,
        { text, users, date, projectId },
        {
          withCredentials: true,
        }
      )
      .then((res) => res.data)
      .then((data) => {
        console.log(data, "create task");
        setTasks(data.data.reverse());
      })
      .catch((err) => {
        if (err.response?.status > 200) {
          console.log("error with get users");
        }
      });
  };

  const removeTask = (taskId: string) => {
    axios
      .delete(`http://localhost:${Port}/task/delete/${projectId}/${taskId}`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((data) => {
        console.log(data, "delete task");
        setTasks(data.data.reverse());
      })
      .catch((err) => {
        if (err.response?.status > 200) {
          console.log("error with delete task");
        }
      });
  };

  const updateTask = (taskId: string, status: string) => {
    axios
      .patch(
        `http://localhost:${Port}/task/update`,
        { taskId, status, projectId },
        {
          withCredentials: true,
        }
      )
      .then((res) => res.data)
      .then((data) => {
        console.log(data, "update task");
        setTasks(data.data.reverse());
      })
      .catch((err) => {
        if (err.response?.status > 200) {
          console.log("error with update task");
        }
      });
  };

  return (
    <Container>
      <Stack gap={3}>
        <Typography
          component="h6"
          variant="h6"
          textAlign="center"
          fontWeight="Bold"
          color="steelblue"
        >
          Task list
        </Typography>
        <TaskAddForm addNewTask={addNewTask} />
        {!!tasks.length &&
          tasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              removeTask={removeTask}
              updateTask={updateTask}
            />
          ))}
      </Stack>
    </Container>
  );
};
