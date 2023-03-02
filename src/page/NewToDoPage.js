import React from "react";
import { TodoForm } from "../components/TodoForm";
import "../Styles/TodoForm.css";

function NewToDoPage(){
    return(
        <TodoForm action={"Crear"} text={"Crea una nueva tarea"}/>
    )
}

export {NewToDoPage}
