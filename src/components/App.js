import React from 'react';
import { TodoCounter } from './TodoCounter';
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { CreateTodoButton } from './CreateTodoButtom';
import { Modal } from '../Modal';
import { TodoForm } from './TodoForm';
import { TodoMessage } from './TodoMessage';
import {useToDo} from '../hooks/useTodo';



function App() {

  const {
    loading, 
    error, 
    totalToDos,
    completedTodos,
    searchedTodos,
    searchValue,
    setSearchValue, 
    completeTodo, 
    deleteTodo, 
    openModal, 
    setOpenModal,
    storageToDos,
    addToDo,
  } = useToDo();

  //Validación para los loadin Skeletons
  let array;
  array = JSON.parse(localStorage.getItem("toDos_V1"));
  if(array === null){
    array = [];
  }
  else if(!array.length){
    array = [];
  }
  else{
    array = JSON.parse(localStorage.getItem("toDos_V1"));
  }
 
  //RETORNAR EL COMPONENTE
  return (

    <React.Fragment>
      <TodoCounter totalToDos={totalToDos} completedTodos={completedTodos}/>
      <TodoSearch loading={loading} searchValue={searchValue} setSearchValue={setSearchValue} searchedTodos={searchedTodos}/>
      <TodoList 
        searchedTodos={searchedTodos}
        loading={loading}
        error={error}
        searchValue={searchValue}
        storageToDos={storageToDos}
        renderMenssage={(message)=><TodoMessage message={message}/>}

        skeleton={()=> loading &&  array.map((todo)=> <li key={todo.text} className='todo-item--skeleton'></li>)}
      >  
        {(todo)=> (
          <TodoItem key={todo.text} text={todo.text} completed={todo.completed} onCompleted={() => completeTodo(todo.text)} onDelete={()=> deleteTodo(todo.text)}/>
        )}
      </TodoList>

      {openModal && (<Modal>
         <TodoForm storageToDos={storageToDos} setOpenModal={setOpenModal} addToDo={addToDo}></TodoForm>
      </Modal>)}
      <CreateTodoButton setOpenModal={setOpenModal}/>
    </React.Fragment>
   
  );
   
   
}

export {App};
