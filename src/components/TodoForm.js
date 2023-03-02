import React from "react";
import { useNavigate } from "react-router-dom";
import { useToDo } from "../hooks/useTodo";

function TodoForm(props){
    const {storageToDos, addToDo, editToDo} = useToDo();
    const [text, setText] = React.useState('');
    const navigate = useNavigate();


    //MANEJADORES DE EVENTOS DE CLICK
    function onSend(event){
        event.preventDefault();
        //Valida si se ingresa texto o no
        if(text === ""){
            return alert("El campo está vacío, debes ingresar una nota");
        }
        //Validar si se ingresa la misma tarea.
        const repeatNote = storageToDos.filter((todo)=>{
            const todoText = todo.text.toLowerCase();
            const repeatText = text.toLowerCase();
            //Si lo ingresado en el input concuerda con el texto de alguna tarea existente
            //devolverá un true
            return todoText === repeatText;
        })
        //VALIDACIÓN SOBRE CUAL ACCIÓN EJECUTAR
        if(props.action === "Crear"){
             //storageToDos vacio significaría que la app se inició por primera vez
            //repeatNote vacio significa que se puede proceder a crear la tarea
            if(!repeatNote[0] || !storageToDos[0]){
                addToDo(text);
                navigate("/");
            }
        }
        else if(props.action === "Editar"){
            editToDo(text, props.param);   
            navigate("/");
        }
        else{
            alert("La nota que intentas ingresar ya existe")
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
        <form className='form'>
            <label className='form__title' name='addtodo'>{props.text}</label>
            {props.action === "Editar" && <p className="form__editText">{props.editText}</p>}
            <textarea className='form__text-area' type='text' placeholder='Escribe una tarea' name='addtodo' value={text} onChange={onChange}></textarea>    
            <div className='form__btn-container'>
                <button type='button' onClick={onSend} className='form__btn-action'>{props.action}</button>   
                <button type='button' onClick={onCancel} className='form__btn-cancel'>Cancelar</button>  
            </div>   
        </form>   
    )
}

export {TodoForm}