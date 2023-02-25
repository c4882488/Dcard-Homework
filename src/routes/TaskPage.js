import React,{ useEffect } from 'react'
import { Button } from "@mui/material";
import { apiGraphql } from "../api";
import TaskList from "../components/TaskList";
import { useState } from "react";
import FormModal from "../components/FormModal";
import {
  createIssues,
  deleteIssues,
  updateIssues,
  getProjectColumn,
  updateProjectStatus,
  queryIssues,
} from "../query";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

function TaskPage(props) {
  const { handleSnackbar } = props;
  const [taskData, setTaskData] = useState({});
  const [taskStatusData, setStatusTaskData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [switchPage, setSwitchPage] = useState(0);
  const [loading, setLoading] = useState(false);
  // 搜尋用
  const [status, setStatus] = useState(null);
  const [sord, setSord] = useState("DESC");
  const [keyword, setKeyword] = useState("");
  // TODO: 可以改成redux
  const [editData, setEditData] = useState({});

  const getIssues = async (endCursor) => {
    let variables;
    if (endCursor !== undefined) {
      variables = {
        query: `repo:${localStorage.getItem("user")}/Vemorize-web ${keyword} sort:created-${sord} type:issue is:open`,
        after: endCursor,
      };
    } else {
      variables = {
        query: `repo:${localStorage.getItem("user")}/Vemorize-web ${keyword} sort:created-${sord} type:issue is:open`,
      };
    }
    await apiGraphql({
      query: queryIssues,
      variables,
    })
      .then((response) => {
        // console.log(response.data.data);
        // 判斷是否有下一頁
        let data = response.data.data.search;
        if (endCursor !== undefined) {
          // 判斷是否有狀態條件
          if (status !== null) {
            setTaskData((per) => {
              return {
                ...per,
                nodes: [
                  ...per.nodes,
                  ...data.nodes,
                ].filter((node) => {
                  return node.projectCards.nodes[0].column.name === status;
                }),
                pageInfo: data.pageInfo,
              };
            });
          } else {
            setTaskData((per) => {
              return {
                ...per,
                nodes: [...per.nodes, ...data.nodes],
                pageInfo: data.pageInfo,
              };
            });
          }
        } else {
          console.log("重來的");
          // 判斷是否有狀態條件
          if (status !== null) {
            setTaskData(() => {
              return {
                ...data,
                nodes: data.nodes.filter((node) => {
                  return node.projectCards.nodes[0].column.name === status;
                }),
              };
            });
          } else {
            setTaskData(() => data);
          }

          if (data.nodes.length <= 0) {
            handleSnackbar("沒有資料", "success");
          }
        }
      })
      .catch((error) => {
        let message = error.response !== undefined ? error.response.data.message : error.message;
        handleSnackbar(message, "error");
      });
  };
  // 取得 Project Status
  const getProjectStatus = () => {
    apiGraphql(getProjectColumn)
      .then((response) => {
        setStatusTaskData(
          response.data.data.viewer.projects.nodes[0].columns.nodes
        );
      })
      .catch((error) => {
        let message = error.response !== undefined ? error.response.data.message : error.message;
        handleSnackbar(message, "error");
      });
  };

  // 控制modal開關
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setEditData({});
    setOpenModal(false);
  };
  // 修改資料
  const handleEditTask = (data) => {
    setEditData(data);
    handleOpenModal();
  };

  // ADD Task
  const handleAddTask = async (data) => {
    let variables = {
      input: {
        title: data.title,
        body: data.bodyText,
        repositoryId: "R_kgDOI5-7Rg",
        projectIds: ["PRO_kwHOAf17HM4A3-p-"],
      },
    };
    await apiGraphql({
      query: createIssues,
      variables,
    })
      .then((response) => {
        handleCloseModal();
        pageReset({
          message: "Add Task success",
          type: "success",
        });
      })
      .catch((error) => {
        handleSnackbar(error.message, "error");
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
        handleCloseModal();
        pageReset({
          message: "Update Task success",
          type: "success",
        });
      })
      .catch((error) => {
        handleSnackbar(error.message, "error");
      });
  };
  // DELETE Task
  const handleDeleteTask = async (id) => {
    await apiGraphql({
      query: deleteIssues,
      variables: { issueId: id },
    })
      .then((response) => {
        pageReset({
          message: "Delete Task success",
          type: "success",
        });
      })
      .catch((error) => {      
        let message = error.response !== undefined ? error.response.data.message : error.message;
        handleSnackbar(message, "error");
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
        pageReset({ message: "Update Project Status success", type: "success"});
      })
      .catch((error) => {
        let message = error.response !== undefined ? error.response.data.message : error.message;
        handleSnackbar(message, "error");
      });
  };
  // 搜尋 Task資料狀態
  const handleChangeStatus = (event,data) => {
    setStatus(data);
  };
  // 搜尋 Task資料時間排序
  const handleSort = () => {
    setSord(sord === "DESC" ? "ASC" : "DESC");
  };
  // 搜尋 Task資料關鍵字
  const handlekeyword = (e) => {
    setKeyword(e.target.value);
  };
  const handleScroll = () => {
    let button =
      document.scrollingElement.offsetHeight -
      document.scrollingElement.clientHeight -
      100;
    if (window.scrollY >= button) {
      setSwitchPage(button);
    }
  };
  const pageReset = (snackbarData) => {
    setSwitchPage(0);
    setLoading((per) => !per);
    if(snackbarData !== undefined){
      handleSnackbar(snackbarData.message, snackbarData.type);
    }
    // await getIssues();
  };

  // 滑動到底部
  useEffect(() => {
    getIssues();
    getProjectStatus();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (Object.keys(taskData).length !== 0) {
      pageReset();
    }
  }, [keyword, sord, status]);

  useEffect(() => {
    const timerId = setTimeout(() => {
        if (Object.keys(taskData).length !== 0) {
          getIssues();
        }
      }, 600);
    
    return () => {
      clearTimeout(timerId);
    };
  }, [loading]);

  useEffect(() => {
    // 判斷是否到底部與是否有下一頁
    if (switchPage < window.scrollY && taskData.pageInfo.hasNextPage) {
      getIssues(taskData.pageInfo.endCursor);
    }
  }, [switchPage]);

  useEffect(() => {
    if (
      Object.keys(taskData).length !== 0 &&
      taskData.nodes.length < 10 &&
      taskData.pageInfo.hasNextPage
    ) {
      getIssues(taskData.pageInfo.endCursor);
    }
  }, [taskData]);

  return (
    <div>
      <h1>Task Manage</h1>
      <Button onClick={handleOpenModal}>Add Task</Button>
      <Box>
        <TextField
          id="find-issues"
          label="find Issues"
          value={keyword}
          onChange={(event) => handlekeyword(event)}
          variant="standard"
        />
      </Box>
      <Box>
        {/* <ButtonGroup
          variant="outlined"
          size="small"
          aria-label="outlined button group"
        >
          {taskStatusData.map((item) => (
            <Button
              sx={
                status === item.name
                  ? styles.StatusButton
                  : styles.unStatusButton
              }
              key={item.id}
              onClick={() => handleChangeStatus(item.name)}
            >
              {item.name}
            </Button>
          ))}
        </ButtonGroup> */}
        <ToggleButtonGroup
          size="small"
          color="primary"
          value={status}
          exclusive
          onChange={handleChangeStatus}
          aria-label="Platform"
        >
          {taskStatusData.map((item) => (
            <ToggleButton key={item.id} value={item.name}>
              {item.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Button variant="outlined" size="small" onClick={() => handleSort()}>
        <ScheduleIcon fontSize="small" />
        {sord === "DESC" ? "▼" : "▲"}
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
      {Object.keys(taskData).length !== 0 ? (
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
  unStatusButton: {
    backgroundColor: "##fff",
  },
};

export default TaskPage;