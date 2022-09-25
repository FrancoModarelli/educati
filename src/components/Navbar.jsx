import React, { useContext } from 'react';
import '../css/navbar.css'
import { UserContext } from '../Context/UserContext';

const Navbar = () => {

    const { conectado } = useContext(UserContext);


    return (
        <div className="Navbar">
            <div>
                <h3>
                    Soy un NAVBAR
                </h3>
            </div>
            <div className='show-usuario'>
                {conectado.apellidoP == null ? conectado.nombre + " " + conectado.apellidoM : conectado.nombre + " " + conectado.apellidoP}
                <div className='show-perfil'>
                    {conectado.perfil}
                </div>
            </div>
        </div>
    )
}

export default Navbar;