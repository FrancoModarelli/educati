import React from 'react';
import { ModificarBtn } from './buttons/ModificarBtn'
import { AiOutlineForm, AiOutlineClose } from 'react-icons/ai'
const Tabla = ({ array, delmod }) => {

    //<ModificarBtn array={array}/>

    const mostrarData = (data) => {
        console.log(data);
    }

    return (
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
                                                className="btn btn-danger btn-sm rounded-0"
                                                type="button"
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title="Delete"
                                                onClick={() => mostrarData(data)}
                                            >
                                                <AiOutlineClose/>
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
                                                <AiOutlineClose/>
                                            </button>
                                        </td>
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default Tabla;