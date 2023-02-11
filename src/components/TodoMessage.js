import React from "react";

function TodoMessage(props){

    return (
        <React.Fragment>
            {props.message.loading && <p className="">Estamos cargando los datos</p>}
            {props.message.error && <p>Ha ocurrido un error al cargar los datos</p>}  
            {((!props.message.loading && !props.message.storageToDos.length)&& !props.message.searchValue )&& <p>Crea tu primera nota.</p>}   
        </React.Fragment>
    )    
}

export {TodoMessage}