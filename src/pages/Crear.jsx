import React from 'react';
import { useParams } from 'react-router-dom';
import FormPersonas from '../components/FormPersonas';
import FormAnio from '../components/FormAnio';
import FormInst from '../components/FormInst';
import Error from './Error';
import FormAcademico from '../components/FormAcademico';

const Crear = () => {

    //obtengo la seccion a la que estoy ingresando
    const { seccion } = useParams();
    

    //utilizo "seccion" para poder switchear entre que componentes voy a renderizar dependiendo la seccion.
    const renderForm = (parameter) => {
        switch (parameter) {
            case 'anioLectivo':
                return <FormAnio seccion={seccion}/>
            case 'institucion':
                return <FormInst seccion={seccion}/>
            case 'personas':
                return <FormPersonas seccion={seccion}/>
            case 'alumnos':
            case 'docentes':
            case 'preceptores':
                return <FormAcademico seccion={seccion}/>
            default:
                return <Error/>
        }
    }

    return (
        renderForm(seccion)
    );
}

export default Crear;