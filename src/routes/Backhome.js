import { Button } from "@mui/material";
import { apiGraphql } from "../api";
import TaskList from "../components/TaskList";
import { useState } from "react";
import FormModal from "../components/FormModal";

function Backhome() {
  const [taskData, setTaskData] = useState([]);
  const onClick = () => {
    console.log();
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
        setTaskData(response.data.data.viewer.issues);
      })
      .catch((error) => {
        // TODO: set error message
        console.log(error);
      });
  };

  const onClickClearn = (event) => {
    setTaskData([]);
  }

  // TODO: add and update
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div>
      <h1>Backhome</h1>
      <Button onClick={onClick}>click</Button>
      <Button onClick={onClickClearn}>click Clearn</Button>
      <Button onClick={handleOpenModal}>click Modal</Button>
      <FormModal open={openModal} handleClose={handleCloseModal} />
      {taskData.length !== 0 ? <TaskList taskData={taskData} /> : null}
    </div>
  );
}

export default Backhome;