import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { TodoForm } from "../components/TodoForm";
import { ErrorPage } from "./ErrorPage";
import { useToDo } from "../hooks/useTodo";
import "../Styles/TodoForm.css";

function EditPage(){
    const {loading, storageToDos} = useToDo();
    const location = useLocation();
    const param = useParams();
    //Validación para mostrar texto de todo a editar
    let editText = null;
    if(loading && !location.state){
        editText = "Cargando..."
    }
    else if(!location.state){
        const newTodos = [...storageToDos];
        const todoToEdit = newTodos.find((todo)=>{
            return todo.id == param.id;
       
        })
        editText = todoToEdit?.text;
    }
    else{
        editText = location.state;
    }
    //Si no se puede encontrar la nota con el id de la ruta, entonces:
    if(!editText){
        return <ErrorPage/>
    }
    //Si se encuentra la nota, entonces cargará el formulario
    return(
        <TodoForm param={param.id} editText={editText} action={"Editar"} text={"Edita la tarea"} ></TodoForm>
    )
}

export {EditPage}