import ListItem from "./ListItem";
const List = ({ tasks, deleteHandler, setText, saveTask }) => {
  const sortedTask = tasks.sort((task1, task2) => task1.pinned < task2.pinned);
  console.log(sortedTask);
  return (
    <div className="list">
      {tasks.length === 0
        ? "No task to complete!!! Enjoy yourself buddy😎"
        : sortedTask.map((task) => (
            <ListItem
              key={task.id}
              id={task.id}
              task={task.task}
              deleteHandler={deleteHandler}
              setText={setText}
              saveTask={saveTask}
              pinned={task.pinned}
              timeStamp={task.timeStamp}
            />
          ))}
    </div>
  );
};
export default List;
