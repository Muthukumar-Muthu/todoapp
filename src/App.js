import "./App.css";
import Login from "./Login";
import { useState } from "react";
import Header from "./Header";
import Form from "./Form";
import List from "./List";
import { db } from "./firebase-config";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  orderBy,
  query,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { getAuth } from "@firebase/auth";
function App() {
  const colRef = collection(db, "tasks");
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(false);
  function formSubmit(e) {
    setLoading(true);
    e.preventDefault();
    saveTask(text);

    //clearing input field
    setText("");
  }
  async function saveTask(text, pinned = false, id) {
    if (id) {
      //for editing the doc
      try {
        await setDoc(doc(db, "tasks", id), {
          timeStamp: serverTimestamp(),
          task: text,
          pinned,
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      //for creating a new doc
      try {
        await addDoc(colRef, {
          timeStamp: serverTimestamp(),
          task: text,
          pinned,
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
  async function getTasks() {
    setTasks([]);
    try {
      const q = query(colRef, orderBy("timeStamp", "desc"));
      const querySnapShot = await getDocs(q);
      const listItems = [];
      querySnapShot.forEach((doc) => {
        listItems.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setTasks(listItems);
    } catch (e) {
      console.log(e);
    }
  }
  async function deleteHandler(key) {
    await deleteDoc(doc(db, "tasks", key));
  }

  return (
    <div className="App">
      {user ? ( //TODO: CHECK THIS
        <Login setUser={setUser} />
      ) : (
        <>
          <Header
            // name={getAuth().currentUser.displayName}
            // profileUrl={getAuth().currentUser.photoURL}
            name="Muthukumar"
            profileUrl={null}
          />
          <Form text={text} submitHandler={formSubmit} setText={setText} />
          <div className="line"></div>
          <button className="get-tasks" onClick={() => getTasks()}>
            Get Tasks
          </button>
          <List
            tasks={tasks}
            deleteHandler={deleteHandler}
            saveTask={saveTask}
          />
        </>
      )}
    </div>
  );
}

export default App;
/*
TODO:
rules
snapshot 
*/
