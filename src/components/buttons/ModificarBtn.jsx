import React, { Fragment, useState } from "react"
import { AiOutlineForm } from 'react-icons/ai'
import ModalMod from "../ModalMod"


export const ModificarBtn = ({ array }) => {

    const [isOpen, setIsOpen] = useState(false);

    const mostrar = () => {
        setIsOpen(!isOpen);
    }
    return (
        <Fragment>
            <button
                className="btn btn-success btn-sm rounded-0"
                type="button"
                data-toggle="tooltip"
                data-placement="top"
                title="Edit"
                onClick={mostrar}
            >
                <AiOutlineForm />
            </button>
            {isOpen ?
                <ModalMod
                    titulo={"Modificar"}
                    estado={isOpen}
                    setEstado={setIsOpen}
                    array = { array }
                /> : ''}
        </Fragment>
    )
}