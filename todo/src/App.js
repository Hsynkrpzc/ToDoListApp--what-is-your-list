import React, { useState, useEffect } from "react";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";

function App() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [willUptadeTodo, setWillUptadeTodo] = useState("");

  useEffect(() => {
    const todosFromLocalStorage = localStorage.getItem("todos")
    console.log(todosFromLocalStorage);
    if (todosFromLocalStorage === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      setTodos(JSON.parse(todosFromLocalStorage))
    }
  }, []);

  const deleteTodo = (id) => {
    console.log(id);
    const filteredTodos = todos.filter(item => item.id !== id);
    setTodos(filteredTodos);
    localStorage.setItem("todos",JSON.stringify(filteredTodos));
  }

  // const editTodo = (id) => {
  //   console.log(id);
  //   setIsEdit(true);
  //   const searchedTodo = todos.find((item) => item.id === id);
  //   setTodoText(searchedTodo.text);
  // };
  // sonra yazacağuz şimdi ihtiyaç yok

  const changeIsDone = (id) => {
    const searchedTodo = todos.find((item) => item.id === id);
    const updatedTodo = {
      ...searchedTodo,
      isDone: !searchedTodo.isDone,
    };
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos([updatedTodo, ...filteredTodos]);
    localStorage.setItem(
      "todos",
      JSON.stringify([updatedTodo, ...filteredTodos])
      );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (todoText === "") {
      alert("Todo text can't be empty!");
      return;
    }

    const hasTodos = todos.find((item) => item.text === todoText);
    console.log(hasTodos);
    if (hasTodos !== undefined) {
      alert("You have the todo already");
      return;
    }
    if (isEdit === true) {
      console.log("willUptadeTodo", "Todo'yu güncelleyeğiz");
      const searchedTodo = todos.find(item => item.id === willUptadeTodo);
      const updatedTodo = {
        ...searchedTodo,
        text: todoText
      }
      const filteredTodos = todos.filter((item) => item.id !== willUptadeTodo)
      setTodos([...filteredTodos, updatedTodo]);
      localStorage.setItem(
        "todos",
        JSON.stringify([...filteredTodos, updatedTodo])
        );
      setTodoText("");
      setIsEdit(false);
      setWillUptadeTodo("");

    }
    else {
      const newTodo = {
        id: new Date().getTime(),
        isDone: false,
        text: todoText,
        date: new Date(),
      };

      console.log("newTodo", newTodo);
      setTodos([newTodo, ...todos]);  //... önceki todos demek
      localStorage.setItem(
        "todos",
        JSON.stringify([...todos, newTodo])
      );
      setTodoText("");
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-5 ">Todo App</h1>
      <TodoForm
        handleSubmit={handleSubmit}
        todoText={todoText}
        setTodoText={setTodoText}
        isEdit={isEdit}
      />
      {todos.length <= 0 ? (
        <p className="text-center my-5"
        >You don't have any todos yet./ Henüz bir Todo eklemedin.</p>
      ) : (
        <> {/* React.Fragment */}
          {todos.map((item) => (
            < Todo
              item={item}
              deleteTodo={deleteTodo}
              setIsEdit={setIsEdit}
              setWillUptadeTodo={setWillUptadeTodo}
              setTodoText={setTodoText}
              changeIsDone={changeIsDone} />
          ))}
        </>
      )}
    </div>
  );
}


export default App;
