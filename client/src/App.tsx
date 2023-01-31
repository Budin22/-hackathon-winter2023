import React, { useEffect, useState } from "react";
import { Container, Stack } from "@mui/material";
import { RegistrationForm } from "./component/RegistrationForm";
import { ProjectList } from "./component/ProjectList";
import { User } from "./component/User";
import axios from "axios";
import { Port } from "./component/port";

export const App = () => {
  const [user, setUser] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:${Port}/user/userIsLogin`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((data) => {
        setUser(data.email);
        setIsLogin(true);
      })
      .catch((err) => {
        if (err.response?.status > 200) {
          console.log("User is not login");
        }
      });
  }, []);

  const getUser = (user: string) => {
    setUser(user);
  };

  const userIsIn = () => {
    setIsLogin(true);
  };

  return (
    <Container>
      <Stack gap={3}>
        {isLogin ? (
          <>
            <User user={user} />
            <ProjectList />
          </>
        ) : (
          <RegistrationForm getUser={getUser} userIsIn={userIsIn} />
        )}
      </Stack>
    </Container>
  );
};
