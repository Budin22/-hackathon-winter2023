import { Box, Button, InputLabel, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginType } from "./LoginType";
import { signin } from "../signinComponents/validateSignin";

const Login = () => {
  const boxStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: yupResolver(signin),
  });

  const onSubmit: SubmitHandler<LoginType> = (data) => {};

  return (
    <div>
      <Box sx={boxStyle}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputLabel htmlFor="email">Your email</InputLabel>
          <TextField
            type="string"
            id="email"
            {...register("email")}
          ></TextField>
          <InputLabel htmlFor="password">Your password</InputLabel>
          <TextField
            type="password"
            id="password"
            {...register("password")}
          ></TextField>
          <Button type="submit">Login</Button>
        </form>
      </Box>
    </div>
  );
};

export default Login;
