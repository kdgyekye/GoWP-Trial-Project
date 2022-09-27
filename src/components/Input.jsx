import { PlusIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { db } from "../firebase.config.js";
import { collection, addDoc } from "firebase/firestore";

function Input() {
  const [task, setTask] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (task) {
      addDoc(collection(db, "items"), {
        name: task,
        done: false,
        createdAt: new Date(),
      });
      setTask("");
    }
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Add a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <div className="add-button" onClick={(e) => addTask(e)}>
        <PlusIcon className="plus-icon" />
      </div>
    </div>
  );
}

export default Input;
