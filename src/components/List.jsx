import { useEffect, useState } from "react";
import { db } from "../firebase.config.js";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { TrashIcon } from "@heroicons/react/outline";
import { CircleSpinner } from "react-spinners-kit";

function List() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  //fetch real-time documents data and display results sorted by time it was created (latest first);
  useEffect(() => {
    const q = query(collection(db, "items"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setTasks(items.sort((a, b) => a.done - b.done));
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleUpdateTask = (id, done) => {
    updateDoc(doc(db, "items", id), {
      done: !done,
    });
  };

  const handleDeleteTask = (id) => {
    deleteDoc(doc(db, "items", id));
  };

  console.log(tasks);
  return (
    <div className="list">
      {loading ? (
        <div className="center-container">
          <CircleSpinner loading color="#9b70c8" size={20} />
        </div>
      ) : tasks ? (
        tasks.length > 0 ? (
          tasks.map((task) => (
            <div className="task-item">
              <div className="task" key={task.id}>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={task.done}
                  onChange={() => handleUpdateTask(task.id, task.done)}
                />
                <p className={`${task?.done ? "task-done" : "task-name"}`}>
                  {task.name}
                </p>
              </div>
              <TrashIcon
                className="delete-icon"
                onClick={() => handleDeleteTask(task.id)}
              />
            </div>
          ))
        ) : (
          <div className="center-container">
            <p className="no-tasks">No tasks to show today!</p>
          </div>
        )
      ) : (
        <div className="center-container">
          <p className="error-tasks">
            Could not fetch tasks. Please try again!
          </p>
        </div>
      )}
    </div>
  );
}

export default List;
