import React from "react";

function TodoForm(props){

    const [text, setText] = React.useState('');
 
    function onSend(event){
        event.preventDefault();
        //Valida si se ingresa texto o no
        console.log(text)
        if(text === ""){
            return alert("El campo está vacío, debes ingresar una nota");
        }
        //Validar si se ingresa la misma tarea guardando un array con la coincidencia o vacio 
        //si en caso tal no hay coincidencias
        const repeatNote = props.storageToDos.filter((todo)=>{
            const todoText = todo.text.toLowerCase();
            const repeatText = text.toLowerCase();
            //Si lo ingresado en el input concuerda con el texto de la tarea que se busca
            //entonces devolverá un true
            return todoText.includes(repeatText);
        })
        //storageToDos vacio significaría que la app se inició por primera vez
        //repeatNote vacio significa que se puede proceder a crear la tarea
        if(!repeatNote[0] || !props.storageToDos[0]){
            props.addToDo(text);
        }else{
            alert("La nota que intentas ingresar ya existe")
        }     
    }
    function onCancel(){
        props.setOpenModal(false)
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