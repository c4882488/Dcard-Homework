import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ProjectStatus from "./ProjectStatus";

function TaskList(props) {
    const {
      node: { bodyText, url, title, id, projectCards },
      taskStatusData,
      handleDeleteTask,
      handleEditTask,
    } = props;
    const { name } = projectCards.nodes[0].column;
    const { id:projectID } = projectCards.nodes[0].project;
    return (
      <div>
        <ProjectStatus taskStatusData={taskStatusData} name={ name } />
        <div>{title}</div>
        <div>{bodyText}</div>
        {/* <div>{id}</div> */}
        {/* TODO: 修改刪除按鈕 */}
        <Button
          variant="contained"
          onClick={() => handleDeleteTask(id)}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          onClick={() => handleEditTask({ id, title, bodyText, projectID })}
          endIcon={<EditIcon />}
        >
          Edit
        </Button>
      </div>
    );
}

export default TaskList;