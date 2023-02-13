import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function TaskList(props) {
    const { bodyText, url, title, id} = props.node;
    return (
      <div>
        {/* TODO: 排序、搜尋 */}
        <div>{title}</div>
        <div>{bodyText}</div>
        {/* TODO: 修改刪除按鈕 */}
        <Button variant="outlined" startIcon={<DeleteIcon />}>
          Delete
        </Button>
        <Button variant="contained" endIcon={<EditIcon />}>
          Edit
        </Button>
      </div>
    );
}

export default TaskList;