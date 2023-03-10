import React from "react";
import { useLocalStorage } from "./useLocalStorage";

//Aquí estará la lógica más importante de la aplicación
function useToDo(){

    const {
        toDos, 
        storageToDos, 
        loading,
        error,
        sincronizeToDos,
        setToDos,
        setStorageToDos,
        saveDataInLocalStorage
        
    } = useLocalStorage("toDos_V2", []); //Custom hook para manejar lógica de estados y preparación de datos
    
    //MARCADOR
    //Filtramos cuantos toDos están completados, esto para el <TodoCounter>
    const completedTodos = storageToDos?.filter((todo)=> !!todo.completed)?.length;
    //Cuantos toDos hay en nuestra lista, completados y no completados.
    const totalToDos = storageToDos?.length;
    //Se crean estados para el botón de abrir modal
    const [openModal, setOpenModal] = React.useState(false);

    //FILTRAR POR BÚSQUEDA
    //se crea un estado para la información del input de búsqueda
    const [searchValue, setSearchValue] = React.useState("");
    let searchedTodos = [];
    //Se valida si se está realizando o no una consulta en el input
    if(!searchValue?.length >= 1){ //En caso que no se esté haciendo una consulta
      //Se valida si la cantidad de toDos es la misma tanto en el array de localStorage como en toDos
      if(toDos?.length < storageToDos?.length){//Si no es la misma  
        setToDos(storageToDos);//Actualizamos el Array de toDos  
      }
      //De lo contrario, si es la misma, renderizamos lo que hay localStorage
      searchedTodos = [...storageToDos];
    }
    else{ //En caso que si se esté haciendo una consulta
      //Guardamos un array con los elementos consultados
      searchedTodos = toDos.filter( todo => {
        const todoText = todo.text.toLowerCase();
        const todoSearch = searchValue.toLowerCase();
        //Si lo ingresado en el input concuerda con el texto de la tarea que se busca
        //entonces devolverá un true
        return todoText.includes(todoSearch);
      });
    }

    //MARCAR UN TODO COMO COMPLETADO
    function completeTodo(text){
      saveDataInLocalStorage(text, "complete");//Esta función modifica lo que hay en localStorage
      //Con esta lógica de realizan cambios a los toDos consultados en el input
      const todoIndexSearch= searchedTodos.findIndex(
        todo => todo.text === text
      );
      const newToDos = [...searchedTodos];   
      if(newToDos[todoIndexSearch].completed === false){
        newToDos[todoIndexSearch].completed = true;
      }
      else{
        newToDos[todoIndexSearch].completed = false;
      }
      //Renderizamos los cambios en la vista actual
      setToDos(newToDos);
      
    }
    //ELIMINAR UN TODO
    function deleteTodo(text){
      saveDataInLocalStorage(text, "delete");//Esta función modifica lo que hay en localStorage
      const todoIndexSearch = searchedTodos.findIndex(
        todo => todo.text === text
      ) 
      const newToDos = [...searchedTodos];
      newToDos.splice(todoIndexSearch, 1);
      setToDos(newToDos);
    }
    //AGREGAR UN TODO
    function addToDo(text){
      const id = createId(storageToDos);
      const newTodos = [...storageToDos];

      newTodos.push({
          text,
          completed: false,
          id,
      }); 
      localStorage.setItem("toDos_V2", JSON.stringify(newTodos));
      setStorageToDos(newTodos);
    }
    //EDITAR UN TODO
    function editToDo(text, id){
      const newTodos = [...storageToDos];
      const todoToEdit = newTodos.map((todo)=>{
        if(todo.id == id){
          todo.text = text;
        }
        return todo;
      });

      localStorage.setItem("toDos_V2", JSON.stringify(todoToEdit));
      setStorageToDos(todoToEdit);
    }
    //RENDERIZADO EN DESKTOP
    React.useEffect(()=>{
      window.addEventListener("resize", resizeListener);
      if(window.innerWidth>=1024){
        const result = openModal === false ? setOpenModal(true) : false;
      }
      function resizeListener(){
        if(window.innerWidth>=1024){
          const result = openModal === false ? setOpenModal(true) : false;
        }
      }
      return ()=> {
        window.removeEventListener("resize", resizeListener);
      } 
    }, [])

    return {
      completedTodos,
      toDos, 
      searchValue,
      openModal,
      totalToDos,
      searchedTodos,
      storageToDos, 
      loading,
      error,
      setToDos,
      setSearchValue,
      setOpenModal,
      setStorageToDos,
      sincronizeToDos,
      editToDo,
      addToDo,
      deleteTodo,
      completeTodo
    }      
}

function createId(todos){
  if(!todos.length){
    return 1;
  }
  const idList = todos.map((todo)=> todo.id);
  return Math.max(...idList) + 1;
 /*  return Date.now().toString(16); */
}

export {useToDo}
