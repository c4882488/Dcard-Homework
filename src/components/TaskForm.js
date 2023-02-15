import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import { apiCreatIssue } from "../api";

function TaskForm(props) {
  const [ taskData , setTaskData ] = useState({
    title: "",
    bodyText: "",
  });

  const { handleClose } = props;

  // 輸入框改變時，更新 state
  const handleChangeText = (e) => {
    setTaskData((prevState)=>{
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      }
    });
  }
  // 表單送出
  const onSubmit = (e) => {
    // add task
    apiCreatIssue("test-homeworks", "test1", {
      title: taskData.title,
      body: taskData.bodyText,
    })
      .then((response) => {
        console.log(response);
        handleClose();
        // TODO: set success message useStatus
        // TODO: 重新取得資料
      })
      .catch((error) => {
        // TODO: set error message useStatus
        console.log(error);
      });
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { mb: 2 },
        "& .MuiButtonBase-root": { m: 1 },
      }}
    >
      <TextField
        helperText="Please enter Task Title"
        fullWidth
        id="title"
        label="Task Title"
        value={taskData.title}
        onChange={(e) => {
          handleChangeText(e);
        }}
      />
      <TextField
        fullWidth
        id="bodyText"
        label="Body Text"
        multiline
        rows={4}
        value={taskData.bodyText}
        onChange={(e) => {
          handleChangeText(e);
        }}
      />

      <Button variant="contained" onClick={(e) => onSubmit(e)}>
        新增
      </Button>
      <Button variant="outlined" onClick={() => handleClose()}>
        取消
      </Button>
    </Box>
  );
}

export default TaskForm;
