import React from 'react';
import '../css/modal.css'
import { NavLink } from 'react-router-dom'

const Modal = ({ estado, titulo, seccion, setEstado }) => {

    return (
        <div>
            {estado &&
                <div className='overlay'>
                    <div className='contenedorModal'>
                        <div className="contenido">
                            <h1>Confirmación</h1>
                            <p>Esta seguro que desea finalizar la operación?</p>
                            <div className='contBotones'>
                                <button type='button' className='btn btn-danger' onClick={() => setEstado(false)}>Cerrar</button>
                                <div className='btn btn-success btn-exit'>
                                    <NavLink className={'navLink'} to={'/adm_gral/' + seccion}>Finalizar</NavLink>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            }
        </div>

    )
}

export default Modal;