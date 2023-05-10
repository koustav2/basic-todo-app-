import { useEffect, useState } from "react";
import { NewTodoForm } from "./components/NewTodoForm";
import TodoList from "./components/TodoList";

import "./styles.css";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const local = localStorage.getItem("ITEMS");
    if (local == null) return [];

    return JSON.parse(local);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      <h4>you have {todos.length} todos</h4>
    </>
  );
}
