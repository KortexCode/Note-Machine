import React from "react";
import { withStorageListener } from "./withStorageListener";
import '../../Styles/ChangeAlert.css';

function ChangeAlert(props){

    if(props.show){
        return (
            <div className="ChangeAlert">
                <div className="ChangeAlert__container">
                    <p className="ChangeAlert__description">Hubo cambios en otras páginas donde tienes cargada la aplicación; debes actualizar los datos</p>
                    <button className="ChangeAlert__button" onClick={
                        ()=>{
                            props.toggleShow()
                        }}
                    >
                        Actualizar información
                    </button>
                </div>
            </div>
        )
    }else{
        console.log("no hubo cambios")
    }

}

const ChangeAlertWithStorageListener = withStorageListener(ChangeAlert);

export {ChangeAlertWithStorageListener}

