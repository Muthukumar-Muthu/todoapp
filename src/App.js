import "./App.css";
import Login from "./Login";
import { useState, useEffect } from "react";
import Header from "./Header";
import Form from "./Form";
import List from "./List";
import { db } from "./firebase-config";
import {
  collection,
  addDoc,
  doc,
  serverTimestamp,
  orderBy,
  query,
  deleteDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { getAuth, signOut } from "@firebase/auth";
function App() {
  const colRef = collection(db, "tasks");
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "users", getUserId(), "tasks"),
        orderBy("timeStamp", "desc")
      );
      const unsub = onSnapshot(
        q,
        { includeMetadataChanges: true },
        (snapshot) => {
          const dummy = [];
          let i = 0;
          snapshot.forEach((doc) => {
            dummy.push({ id: doc.id, ...doc.data() });
            i++;
          });

          setTasks(dummy);
        }
      );

      return unsub;
    }
  }, [user]);
  function getUserId() {
    return getAuth().currentUser.uid;
  }
  function formSubmit(e) {
    e.preventDefault();
    saveTask(text);

    //clearing input field
    setText("");
  }
  async function saveTask(text, id, pinned = false) {
    if (id) {
      //for editing the doc
      try {
        await setDoc(doc(db, "users", getUserId(), "tasks", id), {
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
        await addDoc(collection(db, "users", getUserId(), "tasks"), {
          timeStamp: serverTimestamp(),
          task: text,
          pinned,
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function deleteHandler(key) {
    await deleteDoc(doc(db, "users", getUserId(), "tasks", key));
  }
  function signOutHandler() {
    signOut(getAuth());
    setUser(false);
  }
  return (
    <div className="App">
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <>
          <Header
            name={getAuth().currentUser.displayName}
            profileUrl={getAuth().currentUser.photoURL}
            signOutHandler={signOutHandler}
          />
          <Form text={text} submitHandler={formSubmit} setText={setText} />
          <div className="line"></div>

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

*/
