import React from 'react'
import { NavLink } from 'react-router-dom';
import Constantes from '../components/Constantes';
import Abm from '../components/Abm';
import '../css/anioLectivo.css';

const AnioLectivo = () => {

    return (
        <div>
            <div className="header">
                <h1>Año Lectivo</h1>
                <div className='btn btn-Volver'>
                    <NavLink className={'navLink'} to='/adm_gral'>Volver</NavLink>
                </div>
            </div>

            <Abm url={`${Constantes.RUTA_API}/obtener_usuario.php`} />
        </div>
    );
}

export default AnioLectivo;