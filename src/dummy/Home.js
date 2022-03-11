// import { useEffect, useState } from "react";
// import {
//   addDoc,
//   collection,
//   getFirestore,
//   getDocs,
//   serverTimestamp,
//   doc,
//   onSnapshot,
//   query,
//   orderBy,
//   limit,
// } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import Message from "./Message1";
// export default function Home({ userObject }) {
//   const [text, setText] = useState("");
//   const [messages, setMessages] = useState([]);
//   function submitHandler(e) {
//     e.preventDefault();
//     saveMessage(text);

//     //
//     setText("");
//   }

//   async function saveMessage(messageText) {
//     try {
//       await addDoc(collection(getFirestore(), "texts"), {
//         text,
//         name: getAuth().currentUser.displayName, //TODO:
//         time: serverTimestamp(),
//       });
//     } catch (e) {
//       console.error(e);
//     }
//   }

//   useEffect(() => {
//     const recentMessagesQuery = query(
//       collection(getFirestore(), "texts"),
//       orderBy("time", "desc"),
//       limit(1)
//     );
//     const r = onSnapshot(recentMessagesQuery, function (snapshot) {
//       const last = snapshot.docChanges().map((changes) => {
//         let doc = changes.doc;
//         console.log(doc.id, doc.data());
//         return {
//           id: doc.id,
//           ...doc.data(),
//         };
//       });
//       setMessages((p) => [...p, ...last]);
//     });
//     return r;
//   }, []);

//   useEffect(() => {
//     console.log(messages);
//   }, [messages]);

//   return (
//     <div className="home">
//       <div className="messages">
//         {messages.map((m) => (
//           <Message key={m.id} text={m.text} author={m.name} />
//         ))}
//       </div>
//       <form onSubmit={submitHandler} action="">
//         <input
//           type="text"
//           name=""
//           required
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           className="input"
//         />
//         <button type="submit" className="submit">
//           <input type="file" className="img" name="" id="" />
//           Sent
//         </button>
//       </form>
//     </div>
//   );
// }
