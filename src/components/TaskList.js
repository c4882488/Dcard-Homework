import TaskItem from './TaskItem';

function TaskList(props) {
  const { nodes, pageInfo, totalCount } = props.taskData;
  console.log(nodes, pageInfo, totalCount);
  return (
    <div>
      {nodes.map((node) => (
        <TaskItem key={node.id} node={node} />
      ))}
      {/* TODO:這裡會有選單列表 */}
      <div>{totalCount}</div>
    </div>
  );
}

export default TaskList;