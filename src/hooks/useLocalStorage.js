import React from "react";

function useLocalStorage(item, initialItem) {
  //Se usa un useReducer
  const [state, dispatch] = React.useReducer(
    reducer,
    initial_state(initialItem)
  );
  //Desestructuración del state
  const { loading, toDos, error, sincronize, storageToDos } = state;
  //Action Creators
  const setToDos = (item) =>
    dispatch({ type: actionType.updateToDos, payload: item });
  const setStorageToDos = (item) =>
    dispatch({ type: actionType.updateStorage, payload: item });
  const onThrowError = (item) =>
    dispatch({ type: actionType.error, payload: item });
  const onSicronize = (item) =>
    dispatch({ type: actionType.sincronize, payload: item });
  const onLoading = (item) =>
    dispatch({ type: actionType.charge, payload: item });

  //Se crea un efecto para emular el tiempo que tarda una API en devolver datos
  //Además esto ocurre una sola vez por lo que arriba se crearon variables de estado
  //para manejar los datos que se usan dentro de la lógica según cambian.
  React.useEffect(() => {
    setTimeout(() => {
      //Luego de 1 segundo se obtendrán los datos de la app
      try {
        let newToDos = [];
        //Almacenamiento de la lista de tareas
        const toDosInLocal = localStorage.getItem(item);
        if (!toDosInLocal) {
          //Si está vacío
          localStorage.setItem(item, JSON.stringify(initialItem));
        } else {
          //De lo contrario guardamos lo que hay en lista
          newToDos = JSON.parse(toDosInLocal);
        }
        //Actualizamos estados
        setToDos(newToDos);
        onLoading(false);
        setStorageToDos(newToDos);
        onSicronize(true);
      } catch (e) {
        onThrowError(e);
      }
    }, 1000);
  }, [sincronize]);

  const sincronizeToDos = () => {
    onSicronize(false);
    onLoading(true);
  };

  //Tomaremos lo que hay en localStorage y modificaremos el item del array donde se hayan hecho
  //cambios, luego guardaremos nuevamente esos cambios en el mismo localStorage
  function saveDataInLocalStorage(text, typeAction) {
    const newArray = JSON.parse(localStorage.getItem("toDos_V2"));
    const todoIndex = newArray.findIndex((todo) => todo.text === text);
    if (typeAction === "complete") {
      !newArray[todoIndex].completed
        ? (newArray[todoIndex].completed = true)
        : (newArray[todoIndex].completed = false);
      //Actualizamos el localStorage
      localStorage.setItem("toDos_V2", JSON.stringify(newArray));
      setStorageToDos(newArray);
    }
    if (typeAction === "delete") {
      //Se borra el toDo que tenga coincidencia con el parámetro text
      const newArray = JSON.parse(localStorage.getItem("toDos_V2"));
      const todoIndex = newArray.findIndex((todo) => todo.text === text);
      newArray.splice(todoIndex, 1);
      //Actualizamos el localStorage
      localStorage.setItem("toDos_V2", JSON.stringify(newArray));
      setStorageToDos(newArray);
    }
  }

  return {
    toDos,
    storageToDos,
    loading,
    error,
    sincronizeToDos,
    setToDos,
    saveDataInLocalStorage,
    setStorageToDos,
  };
}

//Estado inicial para el useReducer
const initial_state = (initialItem) => {
  return {
    loading: true,
    toDos: initialItem,
    error: false,
    sincronize: true,
    storageToDos: initialItem,
  };
};
//Actions types
const actionType = {
  charge: "Loading",
  error: "Error",
  sincronize: "Sincronize",
  updateToDos: "Update ToDos",
  updateStorage: "Update Storage",
};
//ObjectReducer que develve todas las posibles acciones dentro de un objeto
const objectReducer = (state, payload) => ({
  [actionType.updateToDos]: {
    ...state,
    toDos: payload,
  },
  [actionType.updateStorage]: {
    ...state,
    storageToDos: payload,
  },
  [actionType.error]: {
    ...state,
    error: payload,
  },
  [actionType.sincronize]: {
    ...state,
    sincronize: payload,
  },
  [actionType.charge]: {
    ...state,
    loading: payload,
  },
});
//Función reducer la cual devuelve la actualización del estado
function reducer(state, action) {
  //Aquí se valida cual acción se manda a ejecutar desde el dispatch
  return objectReducer(state, action.payload)[action.type] || state;
}

export { useLocalStorage };
