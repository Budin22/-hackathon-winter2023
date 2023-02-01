import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Progress } from "./Progress";
import { FetchedProject } from "./ProjectList";
import { TaskList } from "./TaskList";

interface ProjectProps {
  project: FetchedProject;
  removeProject: (projectId: string) => void;
}

export const Project = ({ project, removeProject }: ProjectProps) => {
  const { projectName, _id, date, author } = project;

  const deleteProject = () => {
    removeProject(_id);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box display="flex" alignItems="center" width="100%">
          <Typography
            component="h6"
            variant="h6"
            maxWidth="37%"
            width="100%"
            color="steelblue"
            fontWeight="Bold"
          >
            {projectName}
          </Typography>
          <Typography
            component="h4"
            variant="body1"
            maxWidth="25%"
            width="100%"
            fontWeight="Bold"
            color="steelblue"
          >
            Deadline: {date}
          </Typography>
          <Typography
            component="h4"
            variant="body1"
            maxWidth="20%"
            width="100%"
            fontWeight="Bold"
            color="steelblue"
          >
            Author: {author}
          </Typography>
          <Progress progress={12.5} />
          <Button
            variant="contained"
            type="button"
            onClick={deleteProject}
            sx={{
              marginLeft: "auto",
              marginRight: 3,
            }}
          >
            Remove
          </Button>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ maxHeight: 355, overflowY: "scroll" }}>
        <TaskList projectId={_id} />
      </AccordionDetails>
    </Accordion>
  );
};
