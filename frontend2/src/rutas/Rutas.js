import React from 'react'
import {Routes,Route,BrowserRouter} from "react-router-dom";
import RegistroMatricula from '../paginas/RegistroMatricula';
import MainPage from '../paginas/MainPage';

export default function Rutas() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<MainPage/>} />
        <Route path='/comprobacionMatricula' element={<RegistroMatricula/>} />
        <Route path='*' element={<h1>no existe esta ruta</h1>}/>
    </Routes>
    </BrowserRouter>
  );
}
