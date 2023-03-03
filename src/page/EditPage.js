import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { TodoForm } from "../components/TodoForm";
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
        editText = newTodos.map((todo)=>{
        if(todo.id == param.id){
          return todo.text;
        }
      });
    }
    else{
        editText = location.state;
    }
    
 
    return(
        <TodoForm param={param.id} editText={editText} action={"Editar"} text={"Edita la tarea"} ></TodoForm>
    )
}

export {EditPage}