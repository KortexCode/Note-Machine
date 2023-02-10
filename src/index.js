import React from 'react';
import ReactDOM from 'react-dom/client';
import "./Styles/index.css";
/* import {App} from './resources/App'; */
import {ToDoContext} from './components/TodoContext';

//Aquí renderizamos la app completa
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ToDoContext/>
);


