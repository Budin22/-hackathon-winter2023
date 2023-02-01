import React, { memo, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Stack } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FetchedTask } from "./TaskList";

interface Props {
  removeTask: (taskId: string) => void;
  task: FetchedTask;
  updateTask: (taskId: string, status: string) => void;
}

export const Task = memo(({ removeTask, task, updateTask }: Props) => {
  const { date, text, status, users, _id } = task;
  const [statusLocal, setStatusLocal] = useState(status);

  const handleChange = (event: SelectChangeEvent) => {
    setStatusLocal(event.target.value as string);
  };

  const changeStatus = () => {
    updateTask(_id, statusLocal);
  };

  const deleteTask = () => {
    removeTask(_id);
  };

  return (
    <Card
      sx={{ display: "flex", padding: 1, minHeight: 110, position: "relative" }}
    >
      <Button
        onClick={deleteTask}
        sx={{
          display: "block",
          width: 30,
          height: 30,
          position: "absolute",
          right: 10,
          top: 10,
          padding: 0,
          minWidth: 24,
        }}
      >
        <CloseIcon />
      </Button>

      <CardContent sx={{ width: "100%" }}>
        <Stack>
          <Typography
            width="100%"
            variant="h5"
            color="text.secondary"
            component="h6"
            marginBottom={2}
            maxHeight="10%"
          >
            {text}
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography
              component="h4"
              variant="body1"
              maxWidth="17%"
              width="100%"
              fontWeight="Bold"
              color="steelblue"
            >
              {date}
            </Typography>
            <Typography
              component="h4"
              variant="body1"
              maxWidth="47%"
              width="100%"
              fontWeight="Bold"
              color="steelblue"
            >
              {users.join(", ")}
            </Typography>
            <Box
              sx={{
                minWidth: 120,
                width: "100%",
                maxWidth: "18%",
                marginLeft: "auto",
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={statusLocal}
                  label="status"
                  onChange={handleChange}
                >
                  <MenuItem value="no-status">no-status</MenuItem>
                  <MenuItem value="padding">padding</MenuItem>
                  <MenuItem value="complete">complete</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button
              variant="contained"
              type="button"
              onClick={changeStatus}
              sx={{
                maxWidth: "25%",
                marginRight: 2,
              }}
            >
              Change
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
});
