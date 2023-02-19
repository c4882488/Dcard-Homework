import TaskListItem from "./TaskListItem";

function TaskList(props) {
  const {
    taskData: { nodes, pageInfo, totalCount },
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
      {/* TODO:這裡會有選單列表 */}
      {/* <div>{totalCount}</div> */}
    </div>
  );
}

export default TaskList;