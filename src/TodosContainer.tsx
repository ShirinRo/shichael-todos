import React, { useEffect, useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import "./TodosContainer.css";

type Task = {
  id: string;
  description: string;
  isDone: boolean;
};

function TodosContainer() {
  const [todos, setTodos] = React.useState<Task[]>([]);

  useEffect(() => {
    const storedTodos = window.localStorage.getItem("todos");
    console.log(window.localStorage);
    if (storedTodos === null) {
      return;
    }
    const parsedStoredTodos = JSON.parse(storedTodos);
    setTodos(parsedStoredTodos);
  }, []);

  const addTask = (description: string, taskId: string) => {
    setTodos([
      ...todos,
      { description: description, id: taskId, isDone: false },
    ]);
  };

  const removeTask = (taskId: string) => {
    var filtered = todos.filter(function (task) {
      return task.id !== taskId;
    });
    setTodos(filtered);
  };

  const moveTask = (taskId: string, up: boolean) => {
    const taskIndex = todos.findIndex((task: Task) => {
      return task.id === taskId;
    });
    if (
      taskIndex === -1 ||
      (up && taskIndex === 0) ||
      (!up && taskIndex === todos.length - 1)
    ) {
      return;
    }
    var tempTodos: Task[] = [...todos];
    const newIndex = up ? taskIndex - 1 : taskIndex + 1;
    [tempTodos[newIndex], tempTodos[taskIndex]] = [
      tempTodos[taskIndex],
      tempTodos[newIndex],
    ];
    setTodos([...tempTodos]);
  };

  const toggleTaskIsDone = (taskId: string) => {
    const taskIndex = todos.findIndex((task: Task) => {
      return task.id === taskId;
    });
    var tempTodos: Task[] = [...todos];
    tempTodos[taskIndex].isDone = !tempTodos[taskIndex].isDone;
    setTodos(tempTodos);
  };

  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div>
      <AddTodoInput onTodoSubmit={addTask} />
      <TodosList
        tasks={todos}
        moveTask={moveTask}
        removeTask={removeTask}
        toggleTaskIsDone={toggleTaskIsDone}
      />
    </div>
  );
}

type AddTodoInputProps = {
  onTodoSubmit: (description: string, taskId: string) => void;
};

function AddTodoInput({ onTodoSubmit }: AddTodoInputProps) {
  const [inputText, setInputText] = useState<string>("");
  const handleSubmit = () => {
    onTodoSubmit(inputText, Math.random().toString(36).slice(3));
  };
  return (
    <div className="add-todo-input">
      <label>Enter task description: &nbsp;</label>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />{" "}
      &nbsp;
      <button onClick={() => handleSubmit()} disabled={inputText.length === 0}>
        Add todo
      </button>
    </div>
  );
}

type TodosListProps = {
  tasks: Task[];
  removeTask: (taskId: string) => void;
  moveTask: (taskId: string, up: boolean) => void;
  toggleTaskIsDone: (taskId: string) => void;
};

function TodosList(props: TodosListProps) {
  return (
    <div className="todos-list">
      {props.tasks.map((task: Task) => {
        return (
          <div key={task.id}>
            <div className="todo-container">
              <label className="todo-description-label">
                TODO: {task.description}
              </label>
              <div className="todo-status-buttons">
                <ToggleSwitch
                  value={task.isDone}
                  onChange={() => props.toggleTaskIsDone(task.id)}
                />
                &nbsp;
                <button onClick={() => props.removeTask(task.id)}>
                  remove
                </button>
                &nbsp;
                <label onClick={() => props.moveTask(task.id, true)}>🔼</label>
                &nbsp;
                <label onClick={() => props.moveTask(task.id, false)}>🔽</label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TodosContainer;
