import React, { memo, useCallback, useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

import { Port } from "./port";
import {
  Box,
  InputLabel,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Button,
  FormHelperText,
  Input,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export type TUser = {
  password: string;
  password2: string;
  email: string;
};

export const RegistrationForm = memo(() => {
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const schema = useMemo(
    () =>
      yup.object({
        password: yup.string().trim().min(3).max(15).required(),
        password2: isSignIn
          ? yup.string()
          : yup.string().oneOf([yup.ref("password")]),
        email: yup.string().email().required(),
      }),
    [isSignIn]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUser>({
    resolver: yupResolver(schema),
  });

  const isSignInHandler = useCallback(() => {
    setIsSignIn((state) => !state);
  }, []);

  const onSubmit: SubmitHandler<TUser> = useCallback(
    (data) => {
      try {
        const { email, password } = data;
        if (isSignIn) {
          axios
            .post(
              `http://localhost:${Port}/user/login`,
              { email, password },
              { withCredentials: true }
            )
            .then((res) => res.data)
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              if (err.response.status > 200) {
                setIsError(true);
              }
            });
        } else {
          setIsError(false);
          axios
            .post(
              `http://localhost:${Port}/user/login`,
              { email, password },
              { withCredentials: true }
            )
            .then((res) => res.data)
            .then((data) => {
              setIsSignIn(true);
              console.log(data);
            })
            .catch((err) => {
              if (err.response.status > 200) {
                setIsError(true);
              }
            });
        }
        reset();
      } catch (err) {
        setIsError(true);
        console.log("catch error");
      }
    },
    [isSignIn, reset]
  );
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography
        sx={{ width: "100%" }}
        component="h2"
        variant="h4"
        color="steelblue"
      >
        {isSignIn ? "Login" : "Signup"}
      </Typography>
      <Box display="flex">
        <FormControl sx={{ minWidth: "25%" }} variant="standard">
          <InputLabel>Email</InputLabel>
          <Input {...register("email")} placeholder="name@example.com" />
          <FormHelperText id="email" error>
            {errors.email?.message}
          </FormHelperText>
        </FormControl>
      </Box>
      <Box display="flex">
        <FormControl sx={{ minWidth: "25%" }} variant="standard">
          <InputLabel>Password</InputLabel>
          <Input type="password" {...register("password")} />
          <FormHelperText id="password" error>
            {errors.password?.message}
          </FormHelperText>
        </FormControl>
      </Box>
      {!isSignIn && (
        <Box display="flex">
          <FormControl sx={{ minWidth: "25%" }} variant="standard">
            <InputLabel>Password again</InputLabel>
            <Input type="password" {...register("password2")} />
            <FormHelperText id="password2" error>
              {errors.password2?.message ? "Password should be the same" : ""}
            </FormHelperText>
          </FormControl>
        </Box>
      )}

      {!isSignIn && (
        <Box
          display="flex"
          gap={3}
          flexDirection="column"
          alignItems="flex-start"
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox onChange={isSignInHandler} value={isSignIn} />}
              label="I'm Signed In"
            />
          </FormGroup>
        </Box>
      )}

      <Box sx={{ paddingTop: 3 }}>
        <Button
          variant="contained"
          type="submit"
          sx={{
            maxWidth: "25%",
            marginRight: 2,
          }}
        >
          {isSignIn ? "Login" : "Registry"}
        </Button>
        {isSignIn && (
          <Button
            variant="contained"
            onClick={isSignInHandler}
            sx={{ maxWidth: "25%", marginRight: 2 }}
          >
            Back to signup
          </Button>
        )}
      </Box>

      {isError && (
        <Typography
          sx={{ width: "100%" }}
          component="p"
          variant="subtitle1"
          color="red"
        >
          You have not valid email or password
        </Typography>
      )}
    </form>
  );
});
