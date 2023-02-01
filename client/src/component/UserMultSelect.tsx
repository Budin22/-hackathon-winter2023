import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useEffect, useState } from "react";
import axios from "axios";
import { Port } from "./port";
import { User } from "./UserSelect";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface Props {
  getUsers: (users: Array<string>) => void;
  usersList: Array<string>;
}

export default function UserMultSelect({ getUsers, usersList }: Props) {
  const [personName, setPersonName] = useState<string[]>([]);
  const [users, setUsers] = useState<Array<{ email: string; _id: string }>>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:${Port}/user/all`, { withCredentials: true })
      .then((res) => res.data)
      .then((data) => {
        const allUsers = data.data.map((item: User) => {
          return { email: item.email, _id: item._id };
        });
        setUsers(allUsers);
        setPersonName([]);
      })
      .catch((err) => {
        if (err.response?.status > 200) {
          console.log("error with get users");
        }
      });
  }, []);

  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;

    setPersonName(typeof value === "string" ? value.split(",") : value);
    getUsers(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">
          Responsible for task
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={usersList}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {!!users.length &&
            users.map(({ email, _id }) => (
              <MenuItem
                key={_id}
                value={email}
                style={getStyles(email, personName, theme)}
              >
                {email}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
