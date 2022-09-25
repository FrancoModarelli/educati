import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
/* Contexto */
import { UserContext } from './Context/UserContext';
/* Componentes */
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ControlGeneral from './components/ControlGeneral';
/* Paginas */
import Home from './pages/Home'
import Login from './pages/Login'
import Calendario from './pages/Calendario';
import AdminGeneral from './pages/AdminGeneral';
import Error from './pages/Error';
import Crear from './pages/Crear';
import Modificar from './pages/Modificar';

function App() {

  const [conectado, setConectado] = useState({});

  return (
    <UserContext.Provider value={{ conectado, setConectado }} >
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
        </Routes>
        <div className='flex'>
        <Sidebar />
        <div className='grid'>
          <Navbar />
          <div className='content'>
            <Routes>
              <Route exact path='/home' element={<Home />} />
              <Route exact path='/calendario' element={<Calendario />} />
              <Route exact path='/adm_gral' element={<AdminGeneral />} />
              <Route exact path='/adm_gral/:seccion' element={<ControlGeneral />} />
              <Route exact path='/adm_gral/:seccion/crear%:seccion' element={<Crear />} />
              <Route exact path='/adm_gral/:seccion/modificar%:seccion' element={<Modificar />} />
            </Routes>
          </div>
        </div>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}


export default App;
