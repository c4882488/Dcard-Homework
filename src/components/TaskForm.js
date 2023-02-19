import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import Typography from "@mui/material/Typography";

function TaskForm(props) {
  const { handleClose, handleAddTask, handleUpdateTask, editData } = props;
  const [taskData, setTaskData] = useState({
    title: editData.title || "",
    bodyText: editData.bodyText || "",
    id: editData.id || "",
    projectId: editData.projectId || "",
  });

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
    // TODO: 文字框缺少檢查判斷
    e.preventDefault();
    if(taskData.id !== ""){
      handleUpdateTask(taskData);
    }else{
      handleAddTask(taskData);
    }
  };

  return (
    <div>
      <Typography id="modal-title" variant="h5" component="h2">
        {taskData.id !== "" ? "Edit" : "Add"} Task
      </Typography>
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
          {taskData.id !== "" ? "修改" : "新增"}
        </Button>
        <Button variant="outlined" onClick={() => handleClose()}>
          取消
        </Button>
      </Box>
    </div>
  );
}

export default TaskForm;
