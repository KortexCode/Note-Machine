import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { TodoForm } from "../components/TodoForm";
import "../Styles/TodoForm.css";

function EditPage(){
    const location = useLocation();
    const param = useParams();
   
 
    return(
        <TodoForm param={param.id} editText={location.state} action={"Editar"} text={"Edita la tarea"} ></TodoForm>
    )
}

export {EditPage}