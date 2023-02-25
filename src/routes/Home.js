import React,{ useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { useSnackbar } from "notistack";
import TaskPage from "./TaskPage";
import { apiGraphql } from "../api";
import { getUserName } from "../query";

function Home() {
  const [ login, setLogin ] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  // Oauth2.0 url
  let authorizedWebsite =
    "https://github.com/login/oauth/authorize?client_id=" +
    process.env.REACT_APP_CLIENT_ID +
    ";read:user,scope=repo,project,write:discussion,read:discussion";
  
  // 查詢登入狀態 
  const handleLogin = () => {
    apiGraphql(getUserName)
      .then((response) => {
        localStorage.setItem("user", response.data.data.viewer.login);
        setLogin(true);
      })
      .catch((error) => {
        setLogin(false);
        let message =
          error.response !== undefined
            ? error.response.data.message
            : error.message;
          handleSnackbar(message, "error");
      });
  };
  // snackbar
  const handleSnackbar = (messenger, variant) => {
    enqueueSnackbar(messenger, { variant });
  };

  useEffect(() => {
    if (localStorage.getItem("authToken") !== null ) {
      handleLogin();
    }
  }, []);
  return (
    <div>
      {!login ? (
        <Button variant="contained" href={authorizedWebsite}>
          Login with Github
        </Button>
      ) : (
        <TaskPage handleSnackbar={handleSnackbar} />
      )}
    </div>
  );
}

export default Home;