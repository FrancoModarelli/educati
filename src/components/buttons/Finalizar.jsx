import React, { Fragment, useState } from "react"
import Modal from "../Modal"
import '../../css/buttons.css'


export const Finalizar = ({ seccion }) => {

    const [isOpen, setIsOpen] = useState(false);

    const mostrar = () => {
        setIsOpen(!isOpen);
    }
    return (
        <Fragment>
            <button type="button" className="btn btn-fin" onClick={mostrar}>Finalizar</button>
            {isOpen ?
                <Modal
                    titulo={"Finalizar"} 
                    estado={isOpen}
                    setEstado={setIsOpen}
                    seccion={seccion}
                /> : ''}
        </Fragment>
    )
}
