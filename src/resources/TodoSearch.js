import React from "react";
import {todoContext } from './TodoContext';
import "../Styles/TodoSearch.css";

function TodoSearch(){

    const {setSearchValue, searchedTodos, loading, storageToDos} = React.useContext(todoContext);

    function inputQuery(event){   
        setSearchValue(event.target.value);
    }

    return (  
        <React.Fragment>
            <div className="todo-search__container">
                <input className="todo-search__input" placeholder='Buscar una tarea' onChange={inputQuery}/>
                <span className="todo-search__icon">
                    <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
                </span>
            </div>     
            {((!searchedTodos.length && !loading) && !storageToDos) && <p className="todo-search__coincidences">La búsqueda solicitada no encuentra coincidencias</p>} 
        </React.Fragment>    
    )
}

export {TodoSearch};