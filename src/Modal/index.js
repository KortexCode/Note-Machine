import React from 'react';
import ReactDOM from 'react-dom';
import '../Styles/Modal.css';

function Modal(props){

    return ReactDOM.createPortal(
        <div className="ModalBackground">
            {props.children}
        </div>,
        document.getElementById("modal")
    );
}

export {Modal}