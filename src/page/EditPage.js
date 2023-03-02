import React from "react";
import { useParams } from "react-router-dom";
import { TodoForm } from "../components/TodoForm";
import "../Styles/TodoForm.css";

function EditPage(){
    const param = useParams();
 
    return(
        <TodoForm param={param.id} action={"Editar"} text={"Edita la tarea"} ></TodoForm>
    )
}

export {EditPage}