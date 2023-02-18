import { Button } from "@mui/material";
import { apiGraphql } from "../api";
import TaskList from "../components/TaskList";
import { useState } from "react";
import FormModal from "../components/FormModal";
import { apiCreatIssue, apiUpdateIssue } from "../api";
import { UrlSplit } from "../unit/UrlSplit";
import { getIssues, createIssues, deleteIssues, updateIssues,getProjectColumn } from "../query";

function Backhome() {
  const [taskData, setTaskData] = useState([]);
  const [taskStatusData, setStatusTaskData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  // TODO: 可以改成redux
  const [editData, setEditData] = useState({});

  // TODO: 這裡要做的是把資料拿出來 但要改寫法
  const onClick = () => {
    apiGraphql(getIssues)
      .then((response) => {
        setTaskData(response.data.data.viewer.issues);
      })
      .catch((error) => {
        // TODO: set error message
        console.log(error);
      });
    apiGraphql(getProjectColumn)
      .then((response) => {
        // console.log(response.data.data.viewer.projects.nodes[0].columns.nodes);
        setStatusTaskData(
          response.data.data.viewer.projects.nodes[0].columns.nodes
        );
      })
      .catch((error) => {
        // TODO: set error message
        console.log(error);
      });
  };

  // const onClickClearn = (event) => {
  //   setTaskData([]);
  // };

  // TODO: add and update
  // 控制modal開關
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {setEditData({});setOpenModal(false);};
  const handleEditTask = (data) => {
    setEditData(data);
    handleOpenModal();
  }

  // ADD Task
  const handleAddTask = (data) => {
    let variables = {
      input : {
        title : data.title,
        body : data.bodyText,
        repositoryId : "R_kgDOI5-7Rg",
        projectIds : "PRO_kwHOAf17HM4A3-p-",
      }
    };
    apiGraphql({
      query:createIssues,
      variables,
    })
      .then((response) => {
        console.log(response);
        handleCloseModal();
        // TODO: set success message useStatus
        // TODO: 重新取得資料
      })
      .catch((error) => {
        // TODO: set error message useStatus
        console.log(error);
      });
  };
  // UPDATE Task
  const handleUpdateTask = (data) => {
    console.log(data);
    let variables = {
      issueID: data.id,
      title: data.title,
      body: data.bodyText,
      projectID: [data.projectID],
    };
    apiGraphql({
      query: updateIssues,
      variables,
    })
      .then((response) => {
        console.log(response);
        handleCloseModal();
        // TODO: set success message useStatus
        // TODO: 重新取得資料
      })
      .catch((error) => {
        // TODO: set error message useStatus
        console.log(error);
      });;
  };
  // DELETE Task
  const handleDeleteTask = (id) => {
    apiGraphql({
      query: deleteIssues,
      variables: { issueId: id },
    })
      .then((response) => {
        console.log(response);
        // TODO: set success message useStatus
        // TODO: 重新取得資料
      })
      .catch((error) => {
        // TODO: set error message useStatus
        console.log(error);
      });
  };
  // UPDATE Project status
  const handleUpdateProjectStatus = (id, status) => {

  }

  return (
    <div>
      <h1>Task bar</h1>
      <Button onClick={onClick}>click</Button>
      {/* <Button onClick={onClickClearn}>click Clearn</Button> */}
      <Button onClick={handleOpenModal}>click Modal</Button>
      {/* TODO: 排序、搜尋 */}
      <FormModal
        open={openModal}
        editData={editData}
        handleClose={handleCloseModal}
        handleAddTask={handleAddTask}
        handleUpdateTask={handleUpdateTask}
      />
      {taskData.length !== 0 ? (
        <TaskList
          taskData={taskData}
          taskStatusData={taskStatusData}
          handleDeleteTask={handleDeleteTask}
          handleEditTask={handleEditTask}
        />
      ) : null}
    </div>
  );
}

export default Backhome;