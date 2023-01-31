import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect } from "react";
import axios from "axios";
import { Port } from "./port";

interface User {
  email: string;
  _id: string;
}

interface UserSelectProps {
  getUser: (user: string) => void;
  user: string;
}
export const UserSelect = (props: UserSelectProps) => {
  const [users, setUsers] = React.useState<Array<User>>([]);

  const { getUser, user } = props;

  const handleChange = (event: SelectChangeEvent) => {
    getUser(event.target.value as string);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:${Port}/user/all`, { withCredentials: true })
      .then((res) => res.data)
      .then((data) => {
        const allUsers = data.data.map((item: User) => {
          return { email: item.email, _id: item._id };
        });
        setUsers(allUsers);
      })
      .catch((err) => {
        if (err.response?.status > 200) {
          console.log("error with get users");
        }
      });
  }, []);

  return (
    <Box sx={{ minWidth: 120, width: "100%", maxWidth: "18%" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Users</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={user}
          label="Users"
          onChange={handleChange}
        >
          {!!users.length &&
            users.map(({ _id, email }) => (
              <MenuItem value={email} key={_id}>
                {email}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};
