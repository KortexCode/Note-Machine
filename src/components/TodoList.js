import React from "react";
import "../Styles/TodoList.css";

function TodoList(props) {
  const message = {
    loading: props.loading,
    error: props.error,
    storageToDos: props.storageToDos,
    searchValue: props.searchValue,
  };

  return (
    <section className="todo-list">
      <ul>
        {props.renderMenssage(message)}
        {props.skeleton()}
        {!message.loading && props.searchedTodos.map(props.children)}
      </ul>
    </section>
  );
}

export { TodoList };
