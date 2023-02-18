import { useState } from 'react'
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ProjectStatusItem from './ProjectStatusItem';

function ProjectStatus(props) {
    const { taskStatusData,name } = props;
    // console.log(taskStatusData);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
      <div>
        <Button
          id="ProjectStatusButton"
          variant="outlined"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
        >
          {name}
        </Button>
        <Menu
          id="demo-customized-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
        >
          {taskStatusData.map((item) => {
            return (
              <ProjectStatusItem
                key={item.id}
                item={item}
                handleClose={handleClose}
              />
            );
          })}
        </Menu>
      </div>
    );
}

export default ProjectStatus;