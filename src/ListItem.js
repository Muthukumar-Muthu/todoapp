import { useState } from "react";
import { EditForm } from "./EditForm";
const ListItem = ({ task, deleteHandler, editHandler, id, saveTask }) => {
  const [edit, setEdit] = useState(false);
  console.log(edit);
  return (
    <div className="list-item">
      {edit ? (
        <EditForm
          setEdit={setEdit}
          id={id}
          saveTask={saveTask}
          inputValue={task}
        />
      ) : (
        <div className="wrapper">
          <div>{task}</div>
          <div className="grp">
            <span
              className="delete"
              onClick={() => {
                deleteHandler(id);
              }}
            >
              Delete
            </span>
            <span
              className="edit"
              onClick={() => {
                editHandler(id);
                setEdit((p) => !p);
              }}
            >
              Edit
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
export default ListItem;
