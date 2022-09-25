import React from 'react';
import { useParams } from 'react-router-dom';
import Constantes from '../components/Constantes';
import Abm from '../components/Abm'
import Error from './Error';

const Modificar = () => {

    //obtengo la seccion a la que estoy ingresando
    const { seccion } = useParams();
    

    //utilizo "seccion" para poder switchear entre que componentes voy a renderizar dependiendo la seccion.
    const renderForm = (parameter) => {
        switch (parameter) {
            case 'anioLectivo':
                return <Abm url={`${Constantes.RUTA_API}/abm_anioLectivo.php`} delmod={'modificar'} seccion={'anioLectivo'}/>
            case 'institucion':
                return <Abm url={`${Constantes.RUTA_API}/abm_institucion.php`} delmod={'modificar'} seccion={'institucion'}/>
            case 'alumnos':
                return <Abm url={`${Constantes.RUTA_API}/abm_alumnos.php`} delmod={'modificar'} seccion={'alumno'}/>
            case 'docentes':
                return <Abm url={`${Constantes.RUTA_API}/abm_docentes.php`} delmod={'modificar'} seccion={'docente'}/>
            case 'preceptores':
                return <Abm url={`${Constantes.RUTA_API}/abm_preceptores.php`} delmod={'modificar'} seccion={'preceptor'}/>
            default:
                return <Error/>
        }
    }

    return (
        renderForm(seccion)
    );
}

export default Modificar;