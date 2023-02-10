import React from "react";
import { todoContext } from "./TodoContext";

function TodoForm(){

    const [text, setText] = React.useState('');
    const {addToDo, setOpenModal, storageToDos} = React.useContext(todoContext);
 
    function onSend(event){
        event.preventDefault();
       
        const repeatNote = storageToDos.filter((todo)=>{
            console.log(text)
            const todoText = todo.text.toLowerCase();
            const repeatText = text.toLowerCase();
            //Si lo ingresado en el input concuerda con el texto de la tarea que se busca
            //entonces devolverá un true
            return todoText.includes(repeatText);
        })

        if(!repeatNote[0] || !storageToDos[0]){
            addToDo(text);
        }else{
            alert("La nota que intentas ingresar ya existe")
        }     
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