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
  getDocs,
  doc,
  getDoc,
  serverTimestamp,
  orderBy,
  query,
  deleteDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { getAuth } from "@firebase/auth";
function App() {
  const colRef = collection(db, "tasks");
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(colRef, orderBy("timeStamp", "desc"));
    const unsub = onSnapshot(
      q,
      { includeMetadataChanges: true },
      (snapshot) => {
        const dummy = [];
        let i = 0;
        snapshot.forEach((doc) => {
          //TODO: fix timestamp
          dummy.push({ id: doc.id, ...doc.data() });
          i++;
        });

        console.log(dummy);
        setTasks(dummy);
      }
    );

    return unsub;
  }, []);

  function formSubmit(e) {
    setLoading(true);
    e.preventDefault();
    saveTask(text);

    //clearing input field
    setText("");
  }
  async function saveTask(text, id, pinned = false) {
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
