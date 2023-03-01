import React from "react";
import { createHashRouter, Route, createRoutesFromElements, Routes } from "react-router-dom";
import { ErrorPage } from "../page/ErrorPage";
import { HomePage } from "../page/HomePage";
import { EditPage } from "../page/EditPage";
import { NewToDoPage } from "../page/NewToDoPage";
import { Layout } from "../layout/Layout";

const router = createHashRouter(
    createRoutesFromElements(   
        <Route element={<Layout/>} errorElement={<ErrorPage/>} path="/">
            <Route element={<HomePage/>}
            path="/" index={true} />
            <Route element={<NewToDoPage/>}
            path="/new"/>
            <Route element={<EditPage/>}
            path="/edit/:id"/>
        </Route>        
    )
)

export {router}