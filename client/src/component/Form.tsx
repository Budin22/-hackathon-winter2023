import React from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";

export const Form = () => {
  return (
    <>
      <Typography
        sx={{ textAlign: "center", width: "100%" }}
        component="h2"
        variant="h4"
        color="steelblue"
      >
        Registration form
      </Typography>
      <Box display="flex">
        <FormControl sx={{ minWidth: "25%" }} variant="standard">
          <InputLabel>Email</InputLabel>
          <Input placeholder="name@example.com" />
          <FormHelperText id="email" error>
            {/*{errors.email?.message}*/}
          </FormHelperText>
        </FormControl>
      </Box>
    </>
  );
};
