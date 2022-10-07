import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/adm-gral.css'
import { menuAdmGral } from '../Helpers/menu';


const AdminGeneral = () => {

    return (
        <div className="contenedor">
            <div className='title'>
                <h1 className='title-menu'>Administración General</h1>
            </div>
            <div className='secciones_adm'>
                {menuAdmGral.map((item, index) => {
                    return (
                        <div className="card card-adm" key={index}>
                            <img src={item.foto} className="card-img-top" alt={item.title} />
                            <p className='title-name'>{item.title}</p>
                            <NavLink to={item.url} className={'btn-adm'}>
                                <div className="title-button">Ingresar</div>
                            </NavLink>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default AdminGeneral;