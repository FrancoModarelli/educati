import React, { useContext, useRef, useState } from 'react';
import '../css/login.css'
import { LogoLogin } from '../components/Logo'
import Constantes from '../components/Constantes'
import EnviarData from "../components/EnviarData";
import { Link } from 'react-router-dom'
import { UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navegate = useNavigate();
    //useState para manejar la visibilidad de los mensajes de error y deshabilitar boton de enviar.
    const [error, setError] = useState(null);
    const [espera, setEspera] = useState(false);
    const { setConectado } = useContext(UserContext);

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

        setConectado(respJson);
        setError(respJson.error);
        setEspera(false);

        //redirecciono a la pagina de Home si conexion es True
        if (respJson.conexion) {
            navegate('/home');
            console.log(respJson);
        }
    }

    return (
        <div className="backgroundLogin">
            <div className="row">
                <div className="form-content">
                    <div className='form-logo'>
                        <LogoLogin />
                    </div>
                    <form className='form-login' onSubmit={handleLogin}>
                        <div className="text-form">
                            <h1>Log In</h1>
                            <p>Ingresa tu Usuario y Contraseña para acceder</p>
                            <p>al Panel de Control</p>
                        </div>
                        <div className="form-group form-inputs">
                            <label htmlFor="usuario">Usuario</label>
                            <input
                                type="text"
                                className="form-control"
                                id="usuario"
                                aria-describedby="usuarioHelp"
                                placeholder="Usuario"
                                ref={refUsuario}
                            />
                        </div>
                        <div className="form-group form-inputs">
                            <label htmlFor="contraseña">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="contraseña"
                                placeholder="Password"
                                ref={refClave}
                            />
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
                    <div className='footer-rc'>
                        <Link to="/recuperar">
                            <h3 className='text-rc'>Olvidaste tu Contraseña?</h3>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login