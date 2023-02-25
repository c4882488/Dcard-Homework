import TaskListItem from "./TaskListItem";

function TaskList(props) {
  const {
    taskData: { nodes },
    taskStatusData,
    handleDeleteTask,
    handleEditTask,
    handleUpdateProjectStatus,
  } = props;
  return (
    <div>
      {nodes.map((node) => (
        <TaskListItem
          key={node.id}
          node={node}
          taskStatusData={taskStatusData}
          handleDeleteTask={handleDeleteTask}
          handleEditTask={handleEditTask}
          handleUpdateProjectStatus={handleUpdateProjectStatus}
        />
      ))}
    </div>
  );
}

export default TaskList;