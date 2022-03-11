import ListItem from "./ListItem";
const List = ({ tasks, deleteHandler, editHandler, setText, saveTask }) => {
  console.log(tasks);
  return (
    <div className="list">
      {tasks.length === 0
        ? "No task to complete!!! Enjoy yourself buddy😎"
        : tasks.map((task) => (
            <ListItem
              key={task.id}
              id={task.id}
              task={task.task}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
              setText={setText}
              saveTask={saveTask}
            />
          ))}
    </div>
  );
};
export default List;
