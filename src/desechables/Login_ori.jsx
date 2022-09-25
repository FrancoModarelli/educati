import React, { useRef, useState } from 'react';
import '../css/login.css'
import '../css/floating-labels.css'
import Logo from '../educati_img/logo-principal-resize.png';


const URL_LOGIN = "http://localhost:8888/ws-educati/login.php"

const enviarData = async ( url, data ) => {
    const resp = await fetch (url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const jsonResp = await resp.json();
    return jsonResp;
}

const Login = ({ acceder }) => {

    const [error, setError] = useState(null);
    const [espera, setEspera] = useState(false);

    const refUsuario = useRef(null);
    const refClave = useRef(null);

    const handleLogin = async () => {

        setEspera(true);

        const dataUsuario = {
            "usuario" : refUsuario.current.value,
            "clave" : refClave.current.value,
        }
        const respJson = await enviarData(URL_LOGIN, dataUsuario);

        acceder(respJson.conectado);
        setError( respJson.error);

        setEspera(false);
    }

    return (
        <div className="backgroundLogin">
            <div className="row">
                <div className=" form-content col-sm-2 offset-5">
                    <div className='logo-principal'>
                        <img src={Logo} alt="Educati" />
                    </div>
                    <div className=" form-login card">
                        <div className="card-body">
                            <div className="col-md">
                                <div className="form-label-group outline">
                                    <input
                                        type="text"
                                        id="tt8"
                                        className="form-control shadow-none"
                                        placeholder="Usuario"
                                        ref={refUsuario}
                                    />
                                    <span>
                                        <label htmlFor="tt8">Usuario</label>
                                    </span>
                                </div>
                                <div className="form-label-group outline">
                                    <input
                                        type="password"
                                        id="tt9"
                                        className="form-control shadow-none"
                                        placeholder="Contraseña"
                                        ref={refClave}
                                    />
                                    <span>
                                        <label htmlFor="tt9" >
                                            Contraseña
                                        </label>
                                    </span>
                                </div>
                            </div>
                        </div>
                        {
                            error &&
                            <div className="error-msg">
                                {error}
                            </div>
                        }
                        <div className='btn-padre'>
                            <button onClick={handleLogin} disable={espera.stringify} className='btn btn-ingresar'>Ingresar</button>
                        </div>
                        <div className="footer-rc">
                            <a href='#' className='link-rc'>Recuperar Clave</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login