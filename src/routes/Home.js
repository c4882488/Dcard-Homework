import Button from '@mui/material/Button'

function Home() {
  // TODO: scope尚未設定好 與 導向url
  // scope=user:email
  let authorizedWebsite =
    "https://github.com/login/oauth/authorize?client_id=" +
    process.env.REACT_APP_CLIENT_ID +
    ";scope=repo,project,admin:org,write:discussion,read:discussion";
  return (
    // TODO: token錯誤的處理
    <div>
      <Button variant="contained" href={authorizedWebsite}>
        Login with Github
      </Button>
    </div>
  );
}

export default Home;