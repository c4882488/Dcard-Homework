import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Container } from "@mui/system";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function HomeAppBar(props) {
  const { login, handleLogout } = props;
  // Oauth2.0 url
  let authorizedWebsite =
    "https://github.com/login/oauth/authorize?client_id=" +
    process.env.REACT_APP_CLIENT_ID +
    ";read:user,scope=repo,project,write:discussion,read:discussion";

  return (
    <Box>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Task Manage
            </Typography>
            {!login ? (
              <Button variant="inherit" href={authorizedWebsite}>
                Login with Github
              </Button>
            ) : (
              <Button color="inherit" onClick={() => handleLogout()}>
                Logout
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default HomeAppBar;
