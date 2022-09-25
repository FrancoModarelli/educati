import React, { useRef, useState } from 'react';
import '../css/login.css'
import '../css/floating-labels.css'
import Logo from '../educati_img/logo-principal-resize.png';
import Constantes from '../components/Constantes'
import EnviarData from "../components/EnviarData";


const Login = ({ acceder }) => {

    //useState para manejar la visibilidad de los mensajes de error y deshabilitar boton de enviar.
    const [error, setError] = useState(null);
    const [espera, setEspera] = useState(false);

    //uso de referencia para obtener el valor del campo
    const refUsuario = useRef(null);
    const refClave = useRef(null);

    //manejador para enviar datos ingresados en form para constatar su validez en base de datos
    const handleLogin = async (evento) => {

        setEspera(true);

        evento.preventDefault();

        const dataUsuario = {
            "usuario": refUsuario.current.value,
            "contraseña": refClave.current.value,
        }
        const respJson = await EnviarData(`${Constantes.RUTA_API}/login.php`, dataUsuario);

        acceder(respJson.conectado);
        setError(respJson.error);

        setEspera(false);
    }

    return (
        <div className="backgroundLogin">
            <div className="row">
                <div className=" form-content col-sm-2 offset-5">
                    <div className='logo-principal'>
                        <img src={Logo} alt="Educati" />
                    </div>
                    <form className='form-login' onSubmit={handleLogin}>
                        <div className="col-md input-space">
                            <div className="form-label-group outline">
                                <input
                                    type="text"
                                    id="usuario"
                                    className="form-control shadow-none"
                                    placeholder="Usuario"
                                    ref={refUsuario}
                                />
                                <span>
                                    <label htmlFor="usuario">Usuario</label>
                                </span>
                            </div>
                            <div className="form-label-group outline">
                                <input
                                    type="password"
                                    id="contraseña"
                                    className="form-control shadow-none"
                                    placeholder="Contraseña"
                                    ref={refClave}
                                />
                                <span>
                                    <label htmlFor="contraseña" >
                                        Contraseña
                                    </label>
                                </span>
                            </div>
                        </div>
                        {
                            error &&
                            <div className="error-msg">
                                {error}
                            </div>
                        }
                        <div className='btn-padre'>
                            <button type="submit" disable={espera.stringify} className="btn btn-ingresar">
                                Ingresar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login