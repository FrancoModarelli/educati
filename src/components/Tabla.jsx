import React, { Fragment, useState, useRef} from 'react';
import { ModificarBtn } from './buttons/ModificarBtn'
import { AiOutlineForm, AiOutlineClose } from 'react-icons/ai'
import ModalMod from "./ModalMod"
const Tabla = ({ array, delmod, seccion }) => {

    //<ModificarBtn array={array}/>

    //State para manejar Modal
    const [isOpen, setIsOpen] = useState(false);
    const [arrayModal, setArrayModal] = useState({})


    const mostrar = (data) => {
        setArrayModal(data);
        setIsOpen(!isOpen);
    }

    return (
        <Fragment>
            <table className="table table-striped">
                <thead>
                    {//con este map muestro los nombres de las columnas
                        array.map((item, i) => {
                            if (i === 0) {
                                return (
                                    <tr key={i}>
                                        {Object.keys(item).map((key) => {
                                            return (<th key={key} scope="col">{key}</th>)
                                        })}
                                        <th scope="col">Accion</th>
                                    </tr>
                                )
                            }
                        })
                    }
                </thead>
                <tbody>
                    {//con este map muestro el contenido de cada uno de los campos.
                        array.map((data, index) => {
                            return (
                                <tr key={index}>
                                    {Object.keys(data).map((key) => {
                                        return (<td key={key + index}>{data[key]}</td>);
                                    })}
                                    {
                                        delmod === 'modificar' ?
                                            <td>
                                                <button
                                                    className="btn btn-success btn-sm rounded-0"
                                                    type="button"
                                                    data-toggle="tooltip"
                                                    data-placement="top"
                                                    title="Edit"
                                                    onClick={() => mostrar(data)}
                                                >
                                                    <AiOutlineForm />
                                                </button>
                                            </td>
                                            :
                                            <td>
                                                <button
                                                    className="btn btn-danger btn-sm rounded-0"
                                                    type="button"
                                                    data-toggle="tooltip"
                                                    data-placement="top"
                                                    title="Delete"
                                                >
                                                    <AiOutlineClose />
                                                </button>
                                            </td>
                                    }
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
            {isOpen ?
                <ModalMod
                    titulo={"Modificar"}
                    estado={isOpen}
                    seccion={seccion}
                    setEstado={setIsOpen}
                    array={arrayModal}
                /> : ''}
        </Fragment>
    )
}

export default Tabla;