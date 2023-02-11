import React from "react";
import "../Styles/TodoList.css";

function TodoList(props){
  
    const message = {
        loading: props.loading,
        error: props.error,
        storageToDos : props.storageToDos
    }

    return (
        <section className="todo-list">
            <ul>
                {props.renderMenssage(message)}
                {props.skeleton()}
                {props.searchedTodos.map(props.render)}
            </ul>
        </section>
    )
    
}

export {TodoList};