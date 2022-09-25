import React, { useState, useRef } from 'react'
import { Volver } from '../components/buttons/Volver'
import EnviarData from './EnviarData';
import '../css/crear-form.css'
import { Finalizar } from './buttons/Finalizar';
import Constantes from './Constantes';
import timeout from '../Helpers/timeout'

const FormInst = ({ seccion }) => {

    //state para mostrar el error o success
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    //State Flags
    const [espera, setEspera] = useState(false);
    const [endButton, setEndButton] = useState(false);


    //uso de referencia para obtener el valor del campo
    const refNombre = useRef(null);
    const refDir = useRef(null);
    const refTel = useRef(null);
    const refCorreo = useRef(null);

    //bloqueamos que pueda ingresar caracteres.
    const controlTel = (e) => {

        const valor = e.target.value;
        e.target.value = valor.replace(/[^A-Z\d-]/g, "")

    }
    //manejador para enviar datos ingresados en el form
    const handleCrear = async (evento) => {

        setEspera(true);
        evento.preventDefault();

        const dataAnioLectivo = {
            "nombre": refNombre.current.value,
            "direccion": refDir.current.value,
            "telefono": refTel.current.value,
            "correo": refCorreo.current.value,
        }
        const insertDb = await EnviarData(`${Constantes.RUTA_API}/insert_institucion.php`, dataAnioLectivo);
        setError(insertDb.error);
        setSuccess(insertDb.msj);

        if (error) {
            setEspera(false);
        } else {

            await timeout(500);
            setEspera(false);
            
            //flag para mostrar boton finalizar
            if (!endButton) {
                setEndButton(true)
            }

            await timeout(3000);
            setSuccess('')
            //limpiamos el form
            refNombre.current.value = '';
            refDir.current.value = '';
            refTel.current.value = '';
            refCorreo.current.value = '';
        }


    }

    return (
        <div className='contenedor'>
            <div className='title-section'>
                <h1 className='title-form'>Crear {seccion}</h1>
                {
                    error &&
                    <div className="error-msg">
                        {error}
                    </div>
                }
                {
                    success &&
                    <div className="success-msg">
                        {success}
                    </div>
                }
                <Volver seccion={'/adm_gral/' + seccion} />
            </div>
            <div className='aclaracion'>
                <span>Se dará de alta una nueva institución</span>
            </div>
            <form className='form-crear' onSubmit={handleCrear}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            required
                            type="text"
                            className="form-control form-inputs-crear"
                            id="nombre"
                            placeholder="Nombre Institución"
                            ref={refNombre}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="direccion">Dirección</label>
                        <input
                            required
                            type="text"
                            className="form-control form-inputs-crear"
                            id="direccion"
                            placeholder="Dirección"
                            ref={refDir}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="telefono">Telefono</label>
                        <input
                            required
                            type="text"
                            className="form-control form-inputs-crear"
                            id="telefono"
                            placeholder="Telefono"
                            ref={refTel}
                            maxLength='15'
                            onChange={controlTel}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="correo">Correo</label>
                        <input
                            required
                            type="email"
                            className="form-control form-inputs-crear"
                            id="correo"
                            placeholder="@Correo"
                            ref={refCorreo}
                        />
                    </div>
                </div>{/*row*/}
                <div className='botonesAnio'>
                    <button type="submit" disable={espera.stringify} className={espera ? 'btn disabled' : "btn btn-siguiente"}>
                        {endButton ? "Siguiente" : "Crear"}
                    </button>
                    {endButton &&
                        <Finalizar
                            seccion={seccion} />
                    }
                </div>
            </form >
        </div >
    )
}

export default FormInst