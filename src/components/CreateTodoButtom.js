import React from "react";
import "../Styles/CreateTodoButtom.css";

function CreateTodoButton(props){
    function addNewTodo(){
        props.setOpenModal(prevState => !prevState)
    }
    return <button className="btn-add" onClick={addNewTodo}><i className="fas fa-solid fa-plus"></i></button>
}

export {CreateTodoButton};