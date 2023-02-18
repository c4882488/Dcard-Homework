import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
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
    const { open, handleClose, handleAddTask, editData, handleUpdateTask } =
      props;

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
            <TaskForm
              handleClose={handleClose}
              handleAddTask={handleAddTask}
              editData={editData}
              handleUpdateTask={handleUpdateTask}
            />
          </Box>
        </Fade>
      </Modal>
    );
}

export default FormModal;