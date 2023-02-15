import qs from 'qs'
import { useLocation, useNavigate } from "react-router-dom";
import { apiUserLogin } from '../api';
import { useEffect, useState } from "react";

function Callback() {
    const navigate = useNavigate();
    const [authCode] = useState(
      qs.parse(useLocation().search, { ignoreQueryPrefix: true }).code
    );

    useEffect(() => {
      apiUserLogin({
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRETS,
        code: authCode,
      })
        .then((response) => {
          let data = qs.parse(response.data);
          // console.log(data);
          localStorage.setItem("authToken", "bearer "+data.access_token);
          navigate("/");
        })
        .catch((error) => {
          // TODO: set error message
          console.log(error);
          navigate("/");
        });
    }, [authCode]);

    return ( 
        <div>
            <h1>Callback</h1>
        </div>
    );
}

export default Callback;