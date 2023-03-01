import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/TodoItem.css"

function TodoItem(props){
    const navigate = useNavigate()
    //Manejador de evento de editar
    const handleEdit= ()=>{
        navigate(`/edit/${props.id}`);
    }

    return (
        <React.Fragment>
            <li className="todo-item">
                <span className={`todo-item__btn-check ${props.completed && "todo-item__btn-check--completed"}`} onClick={props.onCompleted}>
                    <i className="check fas fa-regular fa-square-check"></i>
                </span>
                <p className={`${props.completed && "todo-item__task--completed"}`}>{props.text}</p>
                <div className="container-btn">
                    <span className="todo-item__btn-edit" onClick={handleEdit}>
                        <i className="edit fas fa-light fa-pen-to-square"></i>
                    </span>
                    <span className="todo-item__btn-delete" onClick={props.onDelete}>
                        <i className="delete fas fa-solid fa-trash"></i>
                    </span>
                </div>
            </li>
        </React.Fragment>
      );
}

export {TodoItem};