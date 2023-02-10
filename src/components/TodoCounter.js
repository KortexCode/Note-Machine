import React from "react";
import "../Styles/TodoCounter.css";




function TodoCounter(props){

    return (      
        <h2 className="todo-counter">{`Has completado ${props.completedTodos} de ${props.totalToDos} tareas`}</h2>
    )
}

export {TodoCounter};