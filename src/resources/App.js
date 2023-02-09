/* import logo from './logo.svg'; */
import React from 'react';
import { TodoCounter } from './TodoCounter';
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { CreateTodoButton } from './CreateTodoButtom';
import { Modal } from '../Modal';
import { TodoForm } from './TodoForm';
import { todoContext } from './TodoContext';
//Lista de tareas
/* const toDosDefault = [
  {
    text: "Tener un perfil en linkedIn", completed: false
  },
  {
    text: "Tomar el curso de intro React", completed: false
  },
  {
    text: "Ser fullstakcs en Javascript", completed: false
  },
  {
    text: "Conseguir un trabajo", completed: false
  },
]; */

function App() {

  const {
    loading, 
    error, 
    searchedTodos, 
    completeTodo, 
    deleteTodo, 
    openModal, 
    storageToDos} = React.useContext(todoContext);

  //Validación para los loadin Skeletons
  let array;
  array = JSON.parse(localStorage.getItem("toDos_V1"));
  if(!array.length){
    array = [];
  }
  else{
    array = JSON.parse(localStorage.getItem("toDos_V1"));
  }
  
 
  //RETORNAR EL COMPONENTE
  return (

    <React.Fragment>
      <TodoCounter/>
      <TodoSearch/>
      <TodoList>
        {error && <p>Ha ocurrido un error al cargar los datos</p>}
        {loading && <p>Estamos cargando los datos</p>}
        {loading &&  array.map((todo)=> <li key={todo.text} className='todo-item--skeleton'></li>)} 
        {(!loading && !storageToDos.length) && <p>Crea tu primer ToDo</p>}
        {searchedTodos.map(todo => (
        <TodoItem key={todo.text} text={todo.text} completed={todo.completed} onCompleted={() => completeTodo(todo.text)} onDelete={()=> deleteTodo(todo.text)}/>
          ))}
      </TodoList>    
      {openModal && (<Modal>
         <TodoForm></TodoForm>
      </Modal>)}
      <CreateTodoButton/>
    </React.Fragment>
   
  );
   
   
}

export {App};
