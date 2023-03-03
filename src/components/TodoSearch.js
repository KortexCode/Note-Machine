import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../Styles/TodoSearch.css";

function TodoSearch(props){
    const [params, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    function inputQuery(event){   
        props.setSearchValue(event.target.value);
        setSearchParams({search: event.target.value});
        if(event.target.value === ""){
            navigate("/");
        }
    }
    //Si se copia la url en otra pestaña, hará la búsqueda automaticamente según los datos de la url
    useEffect(()=>{
        if(params.get("search") && !props.searchValue){
            props.setSearchValue(params.get("search"));
        }
        if(!params.get("search")){
            props.setSearchValue("");
        }
    })
    return (  
        <React.Fragment>
            <div className={`todo-search__container ${props.loading && "todo-search__container--loading"}`}>
                <input className="todo-search__input" value={params.get("search")??""} disabled={props.loading} placeholder='Buscar una tarea' onChange={inputQuery}/>
                <span className="todo-search__icon">
                    <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
                </span>
            </div>     
            {((props.searchValue && !props.searchedTodos.length) && !props.loading) &&
             <p className="todo-search__coincidences">La búsqueda solicitada no encuentra coincidencias para {`"${props.searchValue}".`} </p>} 
        </React.Fragment>    
    )
}

export {TodoSearch};