import React, { useEffect, useState, useRef, useContext } from 'react'
import { Volver } from '../components/buttons/Volver'
import { UserContext } from '../Context/UserContext';
import Constantes from '../components/Constantes';
import EnviarData from './EnviarData';
import '../css/crear-form.css'
import timeout from '../Helpers/timeout';
import { Finalizar } from './buttons/Finalizar';

const FormAnio = ({ seccion }) => {

    //contexto para traer el id de institucion
    const { conectado } = useContext(UserContext);

    //state para mostrar el error o success
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    //state para guardar nombre de la institucion
    const [nombreInst, setNombreInst] = useState('null')
    //state para poder utilizar los datos de la respuesta del array
    const [arregloInst, setArregloInst] = useState([])
    //state para poder utilizar los datos de la respuesta del array
    const [arregloMaterias, setArregloMaterias] = useState([])
    //state para poder utilizar los datos de la respuesta del array
    const [arregloCursos, setArregloCursos] = useState([])
    //state de flags/aux
    const [varios, setVarios] = useState(false);
    const [espera, setEspera] = useState(false);
    const [endButton, setEndButton] = useState(false);
    const [checkMateria, setCheckMateria] = useState([]);
    const [checkCurso, setCheckCurso] = useState("");
    const [auxInst, setAuxInst] = useState([]);


    //uso de referencia para obtener el valor del campo
    const refNombre = useRef(null);

    //envio de la data para obtener los datos de institucion.
    useEffect(() => {
        handleData();
    }, [])

    //Data de institucion
    const handleData = async () => {
        if (conectado.id_Institucion === 1) {
            obtenerDataInst(`${Constantes.RUTA_API}/obtener_institucion_multi.php`);
            setVarios(true);
        } else {
            const dataInst = await EnviarData(`${Constantes.RUTA_API}/obtener_institucion_unique.php`, conectado.id_Institucion);
            setError(dataInst.error);
            setNombreInst(dataInst.nombre);
            setAuxInst(dataInst);
        }
        const cursos = await EnviarData(`${Constantes.RUTA_API}/obtener_cursos.php`, conectado.id_Institucion);
        setArregloCursos(cursos);
        obtenerDataMaterias(`${Constantes.RUTA_API}/obtener_materias.php`);
    }

    //funcion para recibir la data de todas las instituciones.
    const obtenerDataInst = async (url) => {
        await fetch(url)
            .then(resp => resp.json())
            .then(json => {
                const respuestaInst = json;
                setArregloInst(respuestaInst);
                setAuxInst(respuestaInst.Id_Inst);
            })
    }

    //funcion para recibir la data de todas las Materias.
    const obtenerDataMaterias = async (url) => {
        await fetch(url)
            .then(resp => resp.json())
            .then(json => {
                const respuestaMaterias = json;
                setArregloMaterias(respuestaMaterias);
            })
    }

    // Agrego/elimino item de array Materias
    const handleCheckM = (event) => {
        var updatedListM = [...checkMateria];
        if (event.target.checked) {
            updatedListM = [...checkMateria, event.target.id];
            event.target.classList.add('materia-selected');
            event.target.classList.remove('form-enable-materia');
        } else {
            updatedListM.splice(checkMateria.indexOf(event.target.id), 1);
            event.target.classList.add('form-enable-materia');
            event.target.classList.remove('materia-selected');
        }
        setCheckMateria(updatedListM);

    };

    //manejador para colocar disable los cursos no seleccionados
    const handleCheckC = (event) => {
        const elementCurso = document.getElementsByClassName('form-check-input form-enable-curso');

        if (event.target.checked) {
            event.target.classList.add('curso-selected')
            event.target.classList.remove('form-enable-curso');
            for (var i = 0; i < elementCurso.length; i++) {
                elementCurso[i].disabled = true;
            }
        } else {
            event.target.classList.add('form-enable-curso');
            event.target.classList.remove('curso-selected')
            for (var j = 0; j < elementCurso.length; j++) {
                elementCurso[j].disabled = false;
            }
        }

        setCheckCurso(event.target.id);
    }

    //manejador para colocar disable el curso ya enviado, y dejar enable el resto de los cursos.
    const handlerBlockC = () => {
        const cursoSelected = document.getElementsByClassName('curso-selected');
        const cursoNonSelected = document.getElementsByClassName('form-check-input form-enable-curso');

        cursoSelected[0].classList.add('disabled');
        cursoSelected[0].checked = false;
        cursoSelected[0].disabled = true;
        cursoSelected[0].classList.remove('curso-selected');

        for (var i = 0; i < cursoNonSelected.length; i++) {
            cursoNonSelected[i].disabled = false;
        }

    }

    // manejador para destildar materias
    const handlerUncheckM = () => {
        const materiaSeleted = document.getElementsByClassName('materia-selected');
        for (var l = 0; l < materiaSeleted.length; l++) {
            materiaSeleted[l].checked = false;
        }
    }


    //manejador para enviar datos ingresados en el form
    const handleCrear = async (evento) => {

        setEspera(true);

        evento.preventDefault();

        if (checkCurso.length === 0 || checkMateria.length === 0) {
            setError('Por favor, corroborar que se hayan seleccionado al menos un Curso y una Materia.')
            setEspera(false);
        } else {
            //seteo error vacio para quitar mensaje.
            setError('');

            for (var x = 0; x < checkMateria.length; x++) {

                await timeout(500);//delay de 0.5 segundo

                const dataAnioLectivo = {
                    "nombre": refNombre.current.value,
                    "institucion": auxInst.id,
                    "curso": checkCurso,
                    "materia": checkMateria[x],
                }
                console.log(dataAnioLectivo);
                const insertDb = await EnviarData(`${Constantes.RUTA_API}/insert_anioLectivo.php`, dataAnioLectivo);
                setError(insertDb.error);
                setSuccess(insertDb.msj);
            }

                //bloquedo de curso ya enviado.
                handlerBlockC();

                //deseleccion de materias, para nueva carga.
                handlerUncheckM();

                //limpio array checkMateria
                setCheckMateria([]);

                await timeout(200);
                setSuccess('');
                setEspera(false);

                //flag para mostrar boton finalizar
                if (!endButton) {
                    setEndButton(true)
                }


        }//cierre if
    }


    return (
        <div className='contenedor'>
            <div className='title-section'>
                <h1 className='title-form'>Crear {seccion === 'anioLectivo' ? 'Año Lectivo' : ''}</h1>
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
                <span>Se debe ingresar un nombre, un curso y una materia al menos para crear el Año Lectivo</span>
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
                            placeholder="Nombre Año Lectivo"
                            ref={refNombre}
                        />
                    </div>
                    {varios ?
                        <div className="form-group col-md-4">
                            <label htmlFor="inputInstitucion">Institución</label>
                            <select id="inputInstitucion" className="form-control form-inputs-crear">
                                <option defaultValue={""}>Elegir...</option>
                                {arregloInst.map((inst, index) => <option key={index}>{inst.Nombre}</option>)
                                }
                            </select>
                        </div>
                        : <div className="form-group col-md-6">
                            <label htmlFor="institucion">Institución</label>
                            <input
                                type="text"
                                readOnly
                                className="form-control-plaintext plano"
                                id="institucion"
                                placeholder="Institución"
                                value={nombreInst}
                            />
                        </div>}
                    <div className='titulo-seccion'>
                        <label htmlFor="cursos">Cursos</label>
                    </div>
                    {arregloCursos.map((curso, indice) =>
                        <div className="form-check" key={indice}>
                            <input
                                className="form-check-input form-enable-curso"
                                type="checkbox"
                                value={curso.Cnombre}
                                id={curso.Id_Curso}
                                onClick={handleCheckC}
                            />
                            <label className="form-check-label" >
                                {curso.Cnombre}
                            </label>
                        </div>)}
                    <div className='titulo-seccion'>
                        <label htmlFor="materias">Materias</label>
                    </div>
                    {arregloMaterias.map((materia, ind) =>
                        <div className="form-check" key={ind}>
                            <input
                                className="form-check-input form-enable-materia"
                                type="checkbox"
                                value={materia.Nombre}
                                id={materia.Id_Materia}
                                onClick={handleCheckM}
                            />
                            <label className="form-check-label" htmlFor="defaultCheck2">
                                {materia.Nombre}
                            </label>
                        </div>)}
                </div>
                <div className='botonesAnio'>
                    <button type="submit" disable={espera.stringify} className={espera ? 'btn disabled' : "btn btn-siguiente"}>
                        {endButton ? "Siguiente" : "Crear"}
                    </button>
                    {endButton &&
                        <Finalizar
                            seccion={seccion}/>
                    }
                </div>
            </form >
        </div >
    )
}



export default FormAnio