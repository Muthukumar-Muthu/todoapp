import { useState, useEffect } from "react";
import { EditForm } from "./EditForm";
import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai";
import { Timestamp } from "firebase/firestore";
const ListItem = ({ task, pinned, deleteHandler, id, saveTask, timeStamp }) => {
  const [edit, setEdit] = useState(false);
  const [date, setDate] = useState("");
  useEffect(() => {
    async function g() {
      const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      function padZeroes(num) {
        if (num < 10) return `0${num}`;
        return num;
      }
      const res = new Timestamp(timeStamp.seconds, timeStamp.nanoseconds);
      const date = await res.toDate();
      setDate(
        `${padZeroes(date.getDate())}, ${month[date.getMonth()].substring(
          0,
          3
        )} ${date.getFullYear()} (${padZeroes(date.getHours())}:${padZeroes(
          date.getMinutes()
        )})`
      );
    }
    g();
  }, []);

  function pin(id) {
    saveTask(task, !pinned, id);
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
