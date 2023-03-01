import React from "react";


function withStorageListener(WrappedComponent){

    return function WrappedComponentWithstorageListener(props){

        const [storageChange, setStorageChange] = React.useState(false);

        const toggleShow = ()=>{
            props.sincronizeToDos();
            setStorageChange(false);

        }

        React.useEffect(()=>{
            window.addEventListener("storage", sincronize);
            function sincronize(event){
                if(event.key === "toDos_V1"){
                    setStorageChange(true);
                }
            }
            return ()=> {
              window.removeEventListener("storage", sincronize);
            } 
        }, []) 
       

        return <WrappedComponent 
            show={storageChange}
            toggleShow={toggleShow} 
        />
    }
}

export {withStorageListener}