import React from "react";
import "../Styles/TodoSearch.css";

function TodoSearch(props){

    function inputQuery(event){   
        props.setSearchValue(event.target.value);
    }
    return (  
        <React.Fragment>
            <div className={`todo-search__container ${props.loading && "todo-search__container--loading"}`}>
                <input className="todo-search__input" disabled={props.loading} placeholder='Buscar una tarea' onChange={inputQuery}/>
                <span className="todo-search__icon">
                    <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
                </span>
            </div>     
            {(props.searchValue && !props.searchedTodos.length) && <p className="todo-search__coincidences">La búsqueda solicitada no encuentra coincidencias para {`"${props.searchValue}".`} </p>} 
        </React.Fragment>    
    )
}

export {TodoSearch};