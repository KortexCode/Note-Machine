import React from "react";

function useLocalStorage(item, initialItem){
    //Se crean estados para simular la carga de una API
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    //Se crean un estado donde se almacenarán los toDos que hay en localStorage
    const [storageToDos, setStorageToDos] = React.useState(initialItem)
    //Se crea un estado para manejar los toDos consultados en el input
    const [toDos, setToDos] = React.useState(initialItem);
    
    //Se crea un efecto para emular el tiempo que tarda una API en devolver datos
    //Además esto ocurre una sola vez por lo que arriba se crearon variables de estado
    //para manejar los datos que se usan dentro de la lógica según cambian.
    React.useEffect(()=> {
      
      setTimeout(()=>{//Luego de 1 segundo se obtendrán los datos de la app
        try{
          let newToDos;
          //Almacenamiento de la lista de tareas
          const toDosInLocal = localStorage.getItem(item);
          
    
          if(!toDosInLocal){
            localStorage.setItem(item, JSON.stringify(initialItem));
          }
          else{
            newToDos = JSON.parse(toDosInLocal);
          }
          setToDos(newToDos);
          setLoading(false);
          setStorageToDos(newToDos)
        }catch(e){
          setError(e);
        }
      }, 1000)
    }, []);
    
    //Tomaremos lo que hay en localStorage y modificaremos el item del array donde se hayan hecho
    //cambios, luego guardaremos nuevamente esos cambios en el mismo localStorage
    function saveDataInLocalStorage(text, typeAction){

      const newArray = JSON.parse(localStorage.getItem("toDos_V1"));
      const todoIndex = newArray.findIndex(
        todo => todo.text === text
      );
      if(typeAction === "complete"){
        !newArray[todoIndex].completed ? newArray[todoIndex].completed = true :  
        newArray[todoIndex].completed = false;
        //Actualizamos el localStorage
        localStorage.setItem("toDos_V1", JSON.stringify(newArray));
        setStorageToDos(newArray);
      }
      if(typeAction === "delete"){
        //Se borra el toDo que tenga coincidencia con el parámetro text
        const newArray = JSON.parse(localStorage.getItem("toDos_V1"));
        const todoIndex = newArray.findIndex(
          todo => todo.text === text
        );
        newArray.splice(todoIndex, 1);
        console.log("los new de local", newArray)
         //Actualizamos el localStorage
        localStorage.setItem("toDos_V1", JSON.stringify(newArray));
        setStorageToDos(newArray);
      }
    }
    
  
    return {
      toDos, 
      storageToDos, 
      loading,
      error,
      setToDos,
      saveDataInLocalStorage,
      setStorageToDos
    }
  }

  export {useLocalStorage}