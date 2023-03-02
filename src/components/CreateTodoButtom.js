import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/CreateTodoButtom.css";

function CreateTodoButton(){
    const navigate = useNavigate();

    function addNewTodo(){
        navigate("/new");
    }

    return (
        <button className="btn-add" onClick={addNewTodo}><i className="fas fa-solid fa-plus"></i></button>
    )
}

export {CreateTodoButton};