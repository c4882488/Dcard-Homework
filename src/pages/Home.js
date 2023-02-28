import React,{ useEffect, useState } from 'react'
import { useSnackbar } from "notistack";
import TaskPage from "./TaskPage";
import { apiGraphql } from "../utils/api";
import { getUserName } from "../utils/query";
import HomeAppBar from "../components/HomeAppBar";
import { Box } from '@mui/system';

function Home() {
  const [ login, setLogin ] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  
  // 查詢登入狀態 
  const handleLogin = () => {
    apiGraphql(getUserName, {
      Authorization: localStorage.getItem("authToken"),
    })
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
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setLogin(false);
  }

  useEffect(() => {
    if (localStorage.getItem("authToken") !== null ) {
      handleLogin();
    }
  }, []);

  return (
    <Box>
      <HomeAppBar login={login} handleLogout={handleLogout} />
      {login && <TaskPage handleSnackbar={handleSnackbar} />}
    </Box>
  );
}

export default Home;