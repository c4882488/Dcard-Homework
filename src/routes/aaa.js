import React,{useState,useEffect} from 'react'
import { apiGraphql } from '../api';
import {
  getRepository,
  createRepository,
  createProject,
  createProjectColumn,
} from "../query";

function Aaa() {
    const [repositoryId, setRepositoryId] = useState(null);
    const [projectId, setProjectId] = useState(null);
    const checkRepository = () => {
      apiGraphql({
        query: getRepository,
        variables: { name: "DcardHomework-test" },
      })
        .then((response) => {
          if (response.data.data.viewer.repository === null) {
            createNewRepository();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const createNewRepository = () => {
        apiGraphql({
            query: createRepository,
            variables: { name: "DcardHomework-test" },
        })
            .then((response) => {
                setRepositoryId(response.data.data.createRepository.repository.id);
            })
            .catch((error) => {
            console.log(error);
            });
    }
    const createNewProject = () =>{
        apiGraphql({
          query: createProject,
          variables: {
              name: "DcardHomework-project",
              repositoryId: [repositoryId],
              ownerId: "MDQ6VXNlcjMzMzg5MzQw",
          },
        })
          .then((response) => {
            setProjectId(response.data.data.createProject.project.id);
            // console.log(response.data.data.createProject.project.id);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    const createNewProjectColumn = async () => {
      const columnTitles = ["Open", "In Progress", "Done"];
      const promises = columnTitles.map((title) => {
        return apiGraphql({
          query: createProjectColumn,
          variables: {
            projectId: projectId,
            name: title,
          },
        });
      });
      await Promise.all(promises)
        .then((results) => {
            //console.log("Columns created:", results);
            // do something else
        })
        .catch((error) => {
          console.error(error);
        });
    };

    useEffect(() => {
        checkRepository();
    }, []);
    useEffect(() => {
        if(repositoryId !== null){
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
            <h1>aaa</h1>
        </div>
    );
}

export default Aaa;