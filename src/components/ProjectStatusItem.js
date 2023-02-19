import MenuItem from "@mui/material/MenuItem";

function ProjectStatusItem(props) {
    const { handleUpdateStatus, item } = props;
    return (
      <MenuItem
        onClick={(e) => handleUpdateStatus(e)}
        disableRipple
        id={item.id}
      >
        {item.name}
      </MenuItem>
    );
}

export default ProjectStatusItem;
