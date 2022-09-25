import React from 'react'
import { menuCtrlGral } from '../Helpers/menu';
import { NavLink, useParams } from 'react-router-dom';
import { Volver } from '../components/buttons/Volver'
import '../css/ctrl-gral.css'
import { useEffect } from 'react';
import { useState } from 'react';

const ControlGeneral = () => {

    const { seccion } = useParams();
    const [nSeccion, setNseccion] = useState('null');

    useEffect(()=>{
        nombreSeccion();
    },[seccion])

    const nombreSeccion = () =>{
        if(seccion==='anioLectivo'){
            setNseccion('Año Lectivo');
        }else{
            setNseccion(seccion);
        }
    }

    return (
        <div className='contenedor'>
            <div className='header-cg'>
                <h1>{ nSeccion }</h1>
                <Volver seccion={'/adm_gral'}/>
            </div>
            <div className='secciones'>
                {menuCtrlGral.map((item, index) => {
                    return (
                        <div className="card card-ctl" key={index}>
                            <p className='title-name-ctl'>{item.title}</p>
                            <NavLink to={item.url_ctl+seccion} className={'btn-ctl'}>
                            </NavLink>
                        </div>
                    )
                })}
            </div>
        </div>
    );

}

export default ControlGeneral;