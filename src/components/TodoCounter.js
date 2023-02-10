import React from "react";
import {todoContext } from './TodoContext';
import "../Styles/TodoCounter.css";




function TodoCounter(){

    const {totalToDos, completedTodos} = React.useContext(todoContext);

    return (      
        <h2 className="todo-counter">{`Has completado ${completedTodos} de ${totalToDos} tareas`}</h2>
    )
}

export {TodoCounter};