import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { apiGraphql } from "../api";

function Backhome() {
//   const navigate = useNavigate();
  const onClick = () => {
    // alert("Click");
    //   return redirect("/callback");
    //   navigate("/");
    apiGraphql({
      query: `
        {
        viewer {
            issues(first: 10) {
            pageInfo {
                hasNextPage
                endCursor
                hasPreviousPage
                startCursor
            }
            nodes {
                bodyText
                id
                url
                title
            }
            totalCount
            }
        }
        }
        `,
    })
      .then((response) => {
        console.log(response.data.data);
        // let data = qs.parse(response.data);
      })
      .catch((error) => {
        // TODO: set error message
        console.log(error);
      });
  };
  return (
    <div>
      <h1>Backhome</h1>
      <Button onClick={onClick}>click</Button>
    </div>
  );
}

export default Backhome;