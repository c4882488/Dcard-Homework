import MenuItem from "@mui/material/MenuItem";

function ProjectStatusItem(props) {
    const { handleClose, item } = props;
    return (
        <MenuItem onClick={()=>handleClose()} disableRipple>
        {item.name}
        </MenuItem>
    );
}

export default ProjectStatusItem;
