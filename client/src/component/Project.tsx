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
import { Task } from "./Task";
import { Progress } from "./Progress";

export const Project = () => {
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
            maxWidth="42%"
            width="100%"
            color="steelblue"
            fontWeight="Bold"
          >
            Create a good app for football
          </Typography>
          <Typography
            component="h4"
            variant="body1"
            maxWidth="25%"
            width="100%"
            fontWeight="Bold"
            color="steelblue"
          >
            Deadline: 22.12.2015 13:15:12
          </Typography>
          <Typography
            component="h4"
            variant="body1"
            maxWidth="15%"
            width="100%"
            fontWeight="Bold"
            color="steelblue"
          >
            Author: Budin
          </Typography>
          <Progress progress={12.5} />
          <Button
            variant="contained"
            type="button"
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
        <Task />
      </AccordionDetails>
    </Accordion>
  );
};
