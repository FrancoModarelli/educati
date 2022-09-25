import React from "react"
import '../../css/buttons.css'
import { NavLink } from 'react-router-dom'


export const Volver = ({ seccion }) => {

    //la seccion hace referencia hacia donde va a volver.
    return (
        <div className='btn btn-Volver'>
            <NavLink className={'navLink'} to={ seccion }>Volver</NavLink>
        </div>
    )
}
