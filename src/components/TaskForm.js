import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useInput from "./useInput";

function TaskForm(props) {
  const { handleClose, handleAddTask, handleUpdateTask, editData } = props;
  const { 
    value: title, 
    error: titleError, 
    errorText: titleErrorText, 
    handleChange: handleChangeTitle
  } = useInput(editData.title || "", "title", true);
  const { 
    value: bodyText, 
    error: bodyTextError, 
    errorText: bodyTextErrorText, 
    handleChange: handleChangeBodyText 
  } = useInput(editData.bodyText || "", "bodyText", true);
  
  // 表單送出
  const onSubmit = (e) => {
    e.preventDefault();
    if(titleErrorText || bodyTextErrorText){
      return;
    }
    let taskData = {
        id: editData.id || "",
        projectId: editData.projectId || "",
        title:title, 
        bodyText:bodyText
      }
    if (editData.id !== undefined) {
      handleUpdateTask(taskData);
    } else {
      handleAddTask(taskData);
    }
  };

  return (
    <div>
      <Typography id="modal-title" variant="h5" component="h2">
        {editData.id !== undefined ? "Edit" : "Add"} Task
      </Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { mb: 2 },
          "& .MuiButtonBase-root": { m: 1 },
        }}
      >
        <TextField
          error={titleError}
          helperText={titleErrorText !== null ? titleErrorText : ""}
          fullWidth
          id="title"
          label="Task Title"
          value={title}
          onChange={(e) => {
            handleChangeTitle(e);
          }}
        />
        <TextField
          error={bodyTextError}
          helperText={bodyTextErrorText !== null ? bodyTextErrorText : ""}
          fullWidth
          id="bodyText"
          label="Body Text"
          multiline
          rows={4}
          value={bodyText}
          onChange={(e) => {
            handleChangeBodyText(e);
          }}
        />

        <Button variant="contained" onClick={(e) => onSubmit(e)}>
          {editData.id !== undefined ? "修改" : "新增"}
        </Button>
        <Button variant="outlined" onClick={() => handleClose()}>
          取消
        </Button>
      </Box>
    </div>
  );
}

export default TaskForm;
