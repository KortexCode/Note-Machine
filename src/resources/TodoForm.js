import React from "react";
import { todoContext } from "./TodoContext";

function TodoForm(){

    const [text, setText] = React.useState('');
    const {addToDo, setOpenModal} = React.useContext(todoContext);
 
    function onSend(event){
        event.preventDefault();
        addToDo(text);
    }
    function onCancel(){
        setOpenModal(false)
    }
    function onChange(event){
        const text = event.target.value;
        
        setText(text);
    }
    
    return(
        <form className='AddToDo'>
            <label className='AddToDo__title' name='addtodo'>Crea una nueva tarea</label>
            <textarea className='AddToDo__text-area' type='text' placeholder='Escribe una tarea nueva' name='addtodo' value={text} onChange={onChange}></textarea>    
            <div className='AddToDo__btn-container'>
                <button type='button' onClick={onSend} className='AddToDo__btn-add'>Agregar</button>   
                <button type='button' onClick={onCancel} className='AddToDo__btn-cancel'>Cancelar</button>  
            </div>   
        </form>   
    )
}

export {TodoForm}