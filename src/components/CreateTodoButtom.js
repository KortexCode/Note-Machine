import React from "react";
import { todoContext } from './TodoContext';
import "../Styles/CreateTodoButtom.css";

function CreateTodoButton(){
    const {setOpenModal} = React.useContext(todoContext);
    function addNewTodo(){
        setOpenModal(prevState => !prevState)
    }
    return <button className="btn-add" onClick={addNewTodo}><i className="fas fa-solid fa-plus"></i></button>
}

export {CreateTodoButton};