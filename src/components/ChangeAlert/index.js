import React from "react";
import { withStorageListener } from "./withStorageListener";
import '../../Styles/ChangeAlert.css';

function ChangeAlert(props){

    if(props.show){
        return (
            <div className="ChangeAlert">
                <p className="ChangeAlert__description">Hubo cambios en otras páginas donde tienes cargada la aplicaicón</p>
                <button className="ChangeAlert__button" onClick={
                    ()=>{
                        props.toggleShow()
                    }}
                >
                    Actualizar información
                </button>
            </div>
        )
    }else{
        console.log("no hubo cambios")
    }

}

const ChangeAlertWithStorageListener = withStorageListener(ChangeAlert);

export {ChangeAlertWithStorageListener}

