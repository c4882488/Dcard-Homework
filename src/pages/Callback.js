import qs from 'qs'
import { useLocation, useNavigate } from "react-router-dom";
import { apiUserLogin, apiGraphql } from "../utils/api";
import { useEffect, useState } from "react";
import {
  getRepository,
  createRepository,
  createProject,
  createProjectColumn,
} from "../utils/query";

function Callback() {
  const navigate = useNavigate();
  const [repositoryId, setRepositoryId] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [token, setToken] = useState(null);

  let authCode = qs.parse(useLocation().search, {
    ignoreQueryPrefix: true,
  }).code;

  const checkRepository = async () => {
    await apiGraphql(
      {
        query: getRepository,
        variables: { name: "DcardHomework-test" },
      },
      {
        'Authorization': token
      }
    )
      .then((response) => {
        if (response.data.data.viewer.repository === null) {
          createNewRepository();
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/");
      });
  };
  // TODO: create a Repository or select Repository
  const createNewRepository =async () => {
    await apiGraphql({
      query: createRepository,
      variables: { name: "DcardHomework-test" },
    },{headers: { 'Content-Type': 'application/json', 'Authorization': token }})
      .then((response) => {
        setRepositoryId(response.data.data.createRepository.repository.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // TODO: 創建project columns or select project
  const createNewProject = async () => {
    await apiGraphql(
      {
        query: createProject,
        variables: {
          name: "DcardHomework-project",
          repositoryId: [repositoryId],
          ownerId: "MDQ6VXNlcjMzMzg5MzQw",
        },
      },
      {
        Authorization: token,
      }
    )
      .then((response) => {
        setProjectId(response.data.data.createProject.project.id);
        // console.log(response.data.data.createProject.project.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createNewProjectColumn = async () => {
    const columnTitles = ["Open", "In Progress", "Done"];
    const promises = columnTitles.map((title) => {
      return apiGraphql(
        {
          query: createProjectColumn,
          variables: {
            projectId: projectId,
            name: title,
          },
        },
        {
          Authorization: token,
        }
      );
    });
    await Promise.all(promises)
      .then((results) => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const userLogin = async () => {
    await apiUserLogin(
      {
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRETS,
        code: authCode,
      }
    )
      .then((response) => {
        let data = qs.parse(response.data);
        if (data.access_token !== undefined) {
          let getToken = "bearer " + data.access_token;
          localStorage.setItem("authToken", getToken);
          setToken(getToken);
        }
        // navigate("/");
      })
      .catch((error) => {
        // TODO: set error message
        console.log(error);
        navigate("/");
      });
  }

  useEffect(() => {
    userLogin();
  }, []);

  useEffect(() => {
    console.log("token", token);
    const timerId = setTimeout(() => {
      if (token !== null) {
        // console.log(localStorage.getItem("authToken"));
        checkRepository();
      }
    }, 800);

    return () => {
      clearTimeout(timerId);
    };
  },[token]);
  useEffect(() => {
    if (repositoryId !== null) {
      createNewProject();
    }
  }, [repositoryId]);
  useEffect(() => {
    if (projectId !== null) {
      createNewProjectColumn();
    }
  }, [projectId]);

  return (
    <div>
      <h1>login...</h1>
    </div>
  );
}

export default Callback;