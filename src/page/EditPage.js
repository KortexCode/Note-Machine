import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToDo } from "../hooks/useTodo";
import "../Styles/EditPage.css";

function EditPage(){

    const {editToDo} = useToDo();
    const [text, setText] = React.useState('');
    const navigate = useNavigate();
    const param = useParams();

    //Manejadores de evento de click
    function onSend(event){
        event.preventDefault();
        //Valida si se ingresa texto o no
        if(text === ""){
            return alert("El campo está vacío, debes ingresar una nota");
        }
        //storageToDos vacio significaría que la app se inició por primera vez
        else{
            editToDo(text, param.id);   
        }         
    }
    function onCancel(){
       navigate("/");
    }
    function onChange(event){
        const text = event.target.value;
        setText(text);
    }
    
    return(
        <form className='edit-form'>
            <label className='edit-form__title' name='addtodo'>Edita la tarea</label>
            <textarea className='edit-form__text-area' type='text' placeholder='Escribe un nuevo texto' name='addtodo' value={text} onChange={onChange}></textarea>    
            <div className='edit-form__btn-container'>
                <button type='button' onClick={onSend} className='edit-form__btn-edit'>Editar</button>   
                <button type='button' onClick={onCancel} className='edit-form__btn-cancel'>Cancelar</button>  
            </div>   
        </form>   
    )
}

export {EditPage}