import "./Chat-Page.css";
import { useContext, useRef, useState } from "react";
import { FirebaseContext } from "../../../context/firebase-context";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
const firestore = firebase.firestore();

function ChatPage() {
  const dummy = useRef();
  const { user, auth } = useContext(FirebaseContext);

  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  const [msgInput, setMsgInput] = useState("");

  const sendMassage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: msgInput,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setMsgInput("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="chat-page">
      <h1>Chat-Page</h1>
      {user ? (
        <>
          <div>
            <main>
              {messages && messages.map((message) => <ChatMassage auth={auth} message={message} />)}
              <span ref={dummy}></span>
            </main>
          </div>
          <form onSubmit={sendMassage}>
            <label>
              <input
                value={msgInput}
                onChange={(e) => setMsgInput(e.target.value)}
                type="text"
              />
            </label>
            <button type="submit" disabled={!msgInput}>
              Send
            </button>
          </form>
        </>
      ) : (
        <h1>Please login</h1>
      )}
    </div>
  );
}
function ChatMassage({ message, auth }) {
  const { text, createdAt, uid, photoURL } = message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  );
}
export default ChatPage;
