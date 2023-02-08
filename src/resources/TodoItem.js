import React from "react";
import { todoContext } from './TodoContext';
import "../Styles/TodoItem.css"

function TodoItem(props){
    return (
        <React.Fragment>
            <li className="todo-item">
                <span className={`todo-item__btn-check ${props.completed && "todo-item__btn-check--completed"}`} onClick={props.onCompleted}>
                    <i className="check fas fa-regular fa-square-check"></i>
                </span>
                <p className={`${props.completed && "todo-item__task--completed"}`}>{props.text}</p>
                <span className="todo-item__btn-delete" onClick={props.onDelete}>
                    <i className="delete fas fa-solid fa-trash"></i>
                </span>
            </li>
        </React.Fragment>
      );
}

export {TodoItem};