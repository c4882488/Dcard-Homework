import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ProjectStatus from "./ProjectStatus";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";

function TaskList(props) {
    const {
      node: { bodyText, title, id, projectCards },
      taskStatusData,
      handleDeleteTask,
      handleEditTask,
      handleUpdateProjectStatus,
    } = props;
    const { name } = projectCards.nodes[0].column;
    const { id:projectId } = projectCards.nodes[0].project;
    const { id:projectCardId } = projectCards.nodes[0];

    return (
      <Card sx={{ mt: 2 }}>
        <CardContent>
          {/* 修改刪除按鈕 */}
          <Grid container alignItems="flex-end">
            <Box sx={{ flexGrow: 1 }}>
              <ProjectStatus
                taskStatusData={taskStatusData}
                name={name}
                projectCardId={projectCardId}
                handleUpdateProjectStatus={handleUpdateProjectStatus}
              />
            </Box>
            <Box sx={{ flexDirection: "row-reverse" }}>
              <Tooltip title="Delete" placement="top">
                <IconButton
                  variant="contained"
                  onClick={() => handleDeleteTask(id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Edit" placement="top">
                <IconButton
                  variant="contained"
                  onClick={() =>
                    handleEditTask({ id, title, bodyText, projectId })
                  }
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>

          <Typography sx={{ mb: 0.5 }} variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {bodyText}
          </Typography>
        </CardContent>
      </Card>
    );
}

export default TaskList;