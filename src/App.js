import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useFetch from "./hooks/useFetch";

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTasks = (task) => {
    const loadedTasks = [];

    for (const taskKey in task) {
      loadedTasks.push({ id: taskKey, text: task[taskKey].text });
    }

    setTasks(loadedTasks);
  };
  const { isLoading, error, fetchRequest } = useFetch(
    {
      url: "https://react-custom-hooks-7a2ed-default-rtdb.firebaseio.com/tasks.json",
    },
    transformTasks
  );

  useEffect(() => {
    fetchRequest();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchRequest}
      />
    </React.Fragment>
  );
}

export default App;
