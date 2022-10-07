import React, { useEffect, useState } from 'react'
import Tabla from './Tabla';

const Abm = ( { url, delmod, seccion } ) => {

    //cuando la app esta lista y puede montar la info.
    const [isReady, setIsReady] = useState(false);

    //usamos este estado para poder utilizar los datos de la respuesta del array
    const [arregloJson, setArregloJson] = useState([])

    //cuando el componente ya esta cargado, va a llamar a obtenerData
    useEffect( () => {
        obtenerData(url);
    }, []) 

    //recibe la URL que debe utilizar para llamar a la base de datos.
    const obtenerData = async ( url ) =>{
        await fetch (url)
        .then(resp=> resp.json() )
        .then(json=>{
            //console.log(json);
            const respuestaJson = json;
            setArregloJson(respuestaJson);
            console.log(respuestaJson)
            setIsReady(true)
        })
    }

    return (
        <div>
            {
                isReady ?
                <Tabla array={arregloJson} delmod={ delmod } seccion={ seccion }/>
                :
                <div className="alert alert-info">
                    Cargando datos...
                </div>
            }
        </div>
    );
}

export default Abm;