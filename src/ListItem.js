import { useState, useEffect } from "react";
import { EditForm } from "./EditForm";
import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase-config";
const ListItem = ({ task, pinned, deleteHandler, id, saveTask, timeStamp }) => {
  const [edit, setEdit] = useState(false);
  const [date, setDate] = useState("");

  useEffect(() => {
    async function g() {
      let date = {};
      if (timeStamp === null) {
        date = new Date();
        // const docRef = doc(db, "tasks", id);
        // const docSnap = await getDoc(docRef); TODO: FIX THE TIMESTAMP
        // console.log(docSnap.data());
      } else {
        try {
          const res = new Timestamp(timeStamp.seconds, timeStamp.nanoseconds);
          date = res.toDate();
        } catch (error) {
          setDate("loading..");
          console.log(error);
        }
      }
      setDate(moment(date).format("LLL"));
    }
    g();
  }, []);

  function pin(id) {
    saveTask(task, id, !pinned);
  }
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
          {pinned ? (
            <AiFillPushpin
              title="Unpin this task"
              className="pin-icon"
              onClick={() => {
                pin(id);
              }}
            />
          ) : (
            <AiOutlinePushpin
              title="Pin this task"
              className="pin-icon"
              onClick={() => {
                pin(id);
              }}
            />
          )}
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
                setEdit((p) => !p);
              }}
            >
              Edit
            </span>
            <span className="pin">{`${
              pinned ? "Unpin" : "Pin"
            } this task`}</span>
          </div>
        </div>
      )}
      <div>Last edited : {date}</div>
    </div>
  );
};
export default ListItem;
