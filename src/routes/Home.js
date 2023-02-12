import Button from '@mui/material/Button'

function Home() {
  // scope=user:email
  let authorizedWebsite =
    "https://github.com/login/oauth/authorize?client_id=" +
    process.env.REACT_APP_CLIENT_ID +
    ";";
  return (
    <div>
      <Button variant="contained" href={authorizedWebsite}>
        Login with Github
      </Button>
    </div>
  );
}

export default Home;