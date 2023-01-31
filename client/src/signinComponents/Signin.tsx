import { signin } from "./validateSignin";
import { InputLabel, TextField, Button, Box } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateUserType } from "./CreateUserType";

const Signin = () => {
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
  } = useForm<CreateUserType>({
    resolver: yupResolver(signin),
  });

  const onSubmit: SubmitHandler<CreateUserType> = (data) => {};

  return (
    <div>
      <Box sx={boxStyle}>
        <h1>Please, sign in here</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputLabel htmlFor="userEmail">Your email</InputLabel>
          <TextField
            type="email"
            id="userEmail"
            {...register("email")}
          ></TextField>
          <p>{errors.email?.message}</p>
          <InputLabel htmlFor="userPassword">Your password</InputLabel>
          <TextField
            type="password"
            id="userPassword"
            {...register("password")}
          ></TextField>
          <p>{errors.password?.message}</p>
          <InputLabel htmlFor="userPassword">Enter password again</InputLabel>
          <TextField
            type="password"
            id="userPassword2"
            {...register("password2")}
          ></TextField>
          <p>{errors.password2?.message}</p>
          <Button type="submit">Register</Button>
        </form>
      </Box>
    </div>
  );
};

export default Signin;
