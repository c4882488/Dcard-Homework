import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TaskForm from './TaskForm'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
  "& .MuiTypography-root ": { mb: 2 },
};

function FormModal(props) {
    const { open, handleClose } = props;

    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="modal-title" variant="h5" component="h2">
              Add Task
            </Typography>
            <TaskForm handleClose={handleClose} />
          </Box>
        </Fade>
      </Modal>
    );
}

export default FormModal;