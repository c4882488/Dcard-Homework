import React,{ useEffect } from 'react'
import { Button } from "@mui/material";
import { apiGraphql } from "../api";
import TaskList from "../components/TaskList";
import { useState } from "react";
import FormModal from "../components/FormModal";
import { getIssues, createIssues, deleteIssues, updateIssues, getProjectColumn, updateProjectStatus } from "../query";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function Backhome() {
  const [taskData, setTaskData] = useState([]);
  const [taskStatusData, setStatusTaskData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  // 搜尋用
  const [status, setStatus] = useState(null);
  const [clocked, setClocked] = useState("ASC");
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
        projectIds : ["PRO_kwHOAf17HM4A3-p-"],
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
    let variables = {
      issueId: data.id,
      title: data.title,
      body: data.bodyText,
      projectIds: [data.projectId],
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
  const handleUpdateProjectStatus = (cardId, columnId) => {
    let variables = {
      input: {
        cardId: cardId,
        columnId: columnId,
      },
    };
    apiGraphql({
      query: updateProjectStatus,
      variables,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChangeStatus = (data) => {
    setStatus(data);
    if (data === status) {
      setStatus(null);
    }
  }
  const handleSortClocked = () => {
    setClocked(clocked === "ASC" ? "DESC" : "ASC");
  }
  
  useEffect(() => {
    const handleScroll = (event) => {
      // setScrollTop(window.scrollY);
      let button =
        document.scrollingElement.offsetHeight -
        document.scrollingElement.clientHeight - 50;
      if (window.scrollY > button) {
        console.log("到底了");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  },[])

  return (
    <div>
      <h1>Task bar</h1>
      <Button onClick={onClick}>click</Button>
      <Button onClick={handleOpenModal}>click Modal</Button>
      {/* TODO: 排序、搜尋 */}
      <Box>
        <TextField id="standard-basic" label="find Issues" variant="standard" />
      </Box>
      <Box>
        <ButtonGroup
          variant="outlined"
          size="small"
          aria-label="outlined button group"
        >
          {taskStatusData.map((item) => (
            <Button
              sx={status === item.id ? styles.StatusButton : "primary"}
              key={item.id}
              onClick={() => handleChangeStatus(item.id)}
            >
              {item.name}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      <Button
        variant="outlined"
        size="small"
        onClick={() => handleSortClocked()}
      >
        <ScheduleIcon />
        {clocked == "DESC" ? "▲" : "▼"}
      </Button>

      {/* 新增Task表單 */}
      <FormModal
        open={openModal}
        editData={editData}
        handleClose={handleCloseModal}
        handleAddTask={handleAddTask}
        handleUpdateTask={handleUpdateTask}
      />

      {/* 顯示Task */}
      {taskData.length !== 0 ? (
        <TaskList
          taskData={taskData}
          taskStatusData={taskStatusData}
          handleDeleteTask={handleDeleteTask}
          handleEditTask={handleEditTask}
          handleUpdateProjectStatus={handleUpdateProjectStatus}
        />
      ) : null}
    </div>
  );
}

const styles = {
  StatusButton: {
    backgroundColor: "#878787",
  },
};

export default Backhome;