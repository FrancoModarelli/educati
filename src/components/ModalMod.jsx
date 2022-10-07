import React, {useState} from 'react';
import '../css/modal.css'
import { NavLink } from 'react-router-dom'
import { useEffect } from 'react';

const ModalMod = ({ estado, titulo, seccion, setEstado, array }) => {


    const [keys, setKeys] = useState([]);

    const actualizarData = (e, dataNew) =>{
        
        //prevenimos el refresh de la pagina
        e.preventDefault();
        
        //instaciamos el objeto que vamos a mandar para la modif. de la tabla.
        var dataNew = {}

        //guardamos en un state los valores de las keys que luego utilizaremos para el objeto.
        Object.keys(array).map((key) =>{
            setKeys(currentK => [...currentK, key.toLowerCase()]);
        })

        //guardamos en el objeto los valores de los campos, y su label como key.
        for (let i = 0; i < keys.length; i++) {
            dataNew[keys[i]] = e.target[i].value
        }
        console.log("soy objeto: ", dataNew);
        
        
    }
    return (
        <div>
            {estado &&
                <div className='overlay'>
                    <div className='contenedorModal'>
                        <form className="contenido" onSubmit={actualizarData}>
                            <h1>{titulo}</h1>
                            <div className='col-md-9'>
                                {Object.keys(array).map((key) => {
                                    return (
                                        <div key={key + 1}>
                                            <label>
                                                {key}
                                            </label>
                                            {key === 'Id' ? <input className="form-control" type="text" defaultValue={array[key]} disabled /> : 
                                            <input className="form-control" type="text" defaultValue={array[key]} />}
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='contBotones'>
                                <button type='button' className='btn btn-danger' onClick={() => setEstado(false)}>Cerrar</button>
                                <button type='submit' className='btn btn-success'>Confirmar</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>

    )
}

export default ModalMod