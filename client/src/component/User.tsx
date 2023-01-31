import React from "react";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { Port } from "./port";

interface UserProps {
  user: string;
}
export const User = ({ user }: UserProps) => {
  const logout = () => {
    axios
      .get(`http://localhost:${Port}/user/logout`, { withCredentials: true })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((err) => {
        if (err.response?.status > 200) {
          console.log("error with logout");
        }
      });
  };
  return (
    <Box display="flex" alignItems="center" gap={3}>
      <Typography
        component="h6"
        variant="h6"
        color="steelblue"
        fontWeight="Bold"
        marginLeft="auto"
      >
        {user}
      </Typography>
      <Button
        variant="contained"
        type="button"
        onClick={logout}
        sx={{
          maxWidth: "25%",
        }}
      >
        Logout
      </Button>
    </Box>
  );
};
