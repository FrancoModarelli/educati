import React, { useEffect, useState, useRef, useContext } from 'react'
import { Volver } from '../components/buttons/Volver'
import { UserContext } from '../Context/UserContext';
import Constantes from '../components/Constantes';
import EnviarData from './EnviarData';
import '../css/crear-form.css'
import timeout from '../Helpers/timeout';
import randomInt from '../Helpers/random';

const FormAcademico = ({ seccion }) => {

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
    //state para poder utilizar los datos de la respuesta del array
    const [arregloAlumnos, setArregloAlumnos] = useState([])
    //state para poder utilizar los datos de la respuesta del array
    const [arregloTutores, setArregloTutores] = useState([])
    //state para poder utilizar los datos de la respuesta del array
    const [arregloPreceptores, setArregloPreceptores] = useState([])
    //state para poder utilizar los datos de la respuesta del array
    const [arregloProfesores, setArregloProfesores] = useState([])
    //state de flags/aux
    const [varios, setVarios] = useState(false);
    const [espera, setEspera] = useState(false);
    const [checkMateria, setCheckMateria] = useState([]);
    const [checkCurso, setCheckCurso] = useState([]);
    const [auxInst, setAuxInst] = useState([]);

    //uso de referencia para obtener el valor del campo
    const refAlumno = useRef(null);
    const refTutor = useRef(null);
    const refProf = useRef(null);
    const refPrecep = useRef(null);
    const refInst = useRef(null);

    //envio de la data para obtener los datos de institucion.
    useEffect(() => {
        handleData();
    }, [])

    //Data de institucion
    const handleData = async () => {
        if (conectado.id_Institucion === 1) {
            obtenerDataInst(`${Constantes.RUTA_API}/obtener_institucion_multi.php`);
            obtenerDataAlumnos(`${Constantes.RUTA_API}/obtener_totalAlumnos.php`);
            obtenerDataTutores(`${Constantes.RUTA_API}/obtener_totalTutores.php`);
            obtenerDataPreceptores(`${Constantes.RUTA_API}/obtener_totalPreceptores.php`);
            obtenerDataProfesores(`${Constantes.RUTA_API}/obtener_totalProfesores.php`);
            setVarios(true);
        } else {
            const dataInst = await EnviarData(`${Constantes.RUTA_API}/obtener_institucion_unique.php`, conectado.id_Institucion);
            const alumnos = await EnviarData(`${Constantes.RUTA_API}/obtener_alumnos.php`, conectado.id_Institucion);
            const tutores = await EnviarData(`${Constantes.RUTA_API}/obtener_tutores.php`, conectado.id_Institucion);
            const profesores = await EnviarData(`${Constantes.RUTA_API}/obtener_profesores.php`, conectado.id_Institucion);
            const preceptores = await EnviarData(`${Constantes.RUTA_API}/obtener_preceptores.php`, conectado.id_Institucion);
            setError(dataInst.error);
            setNombreInst(dataInst.nombre);
            setAuxInst(dataInst);
            setArregloAlumnos(alumnos);
            setArregloTutores(tutores);
            setArregloPreceptores(profesores);
            setArregloProfesores(preceptores);
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

    //funcion para recibir la data de todas los alumnos.
    const obtenerDataAlumnos = async (url) => {
        await fetch(url)
            .then(resp => resp.json())
            .then(json => {
                const respuestaAlumnos = json;
                setArregloAlumnos(respuestaAlumnos);
            })
    }

    //funcion para recibir la data de todas los Tutores.
    const obtenerDataTutores = async (url) => {
        await fetch(url)
            .then(resp => resp.json())
            .then(json => {
                const respuestaTutores = json;
                setArregloTutores(respuestaTutores);
            })
    }

    //funcion para recibir la data de todas los Preceptores.
    const obtenerDataPreceptores = async (url) => {
        await fetch(url)
            .then(resp => resp.json())
            .then(json => {
                const respuestaPreceptores = json;
                setArregloPreceptores(respuestaPreceptores);
            })
    }
    //funcion para recibir la data de todas los Tutores.
    const obtenerDataProfesores = async (url) => {
        await fetch(url)
            .then(resp => resp.json())
            .then(json => {
                const respuestaProfesores = json;
                setArregloProfesores(respuestaProfesores);
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
        var updatedListC = [...checkCurso];
        const elementCurso = document.getElementsByClassName('form-check-input form-enable-curso');

        if (event.target.checked) {
            updatedListC = [...checkCurso, event.target.id];
            event.target.classList.add('curso-selected');
            event.target.classList.remove('form-enable-curso');
            if (updatedListC.length >= 3) {
                for (var h = 0; h < elementCurso.length; h++) {
                    elementCurso[h].disabled = true;
                }
            } else {
                for (var v = 0; v < elementCurso.length; v++) {
                    elementCurso[v].disabled = false;
                }
            }
        } else {
            updatedListC.splice(checkCurso.indexOf(event.target.id), 1);
            event.target.classList.add('form-enable-curso');
            event.target.classList.remove('curso-selected');
            if (updatedListC.length < 3) {
                for (var t = 0; t < elementCurso.length; t++) {
                    elementCurso[t].disabled = false;
                }
            } else {
                for (var q = 0; q < elementCurso.length; q++) {
                    elementCurso[q].disabled = true;
                }
            }
        }

        setCheckCurso(updatedListC);
    }

    // manejador para destildar materias
    const handlerUncheckM = () => {
        const materiaSeleted = document.getElementsByClassName('materia-selected');
        for (var l = 0; l < materiaSeleted.length; l++) {
            materiaSeleted[l].checked = false;
        }
    }

    // manejador para destildar cursos
    const handlerUncheckC = () => {
        const cursosSeleted = document.getElementsByClassName('curso-selected');
        for (var z = 0; z < cursosSeleted.length; z++) {
            cursosSeleted[z].checked = false;
        }
    }

    //manejador para enviar datos ingresados en el form
    const handleCrear = async (evento) => {

        setEspera(true);

        evento.preventDefault();

        //En el caso de Alumnos o Profesores, consultamos si seleccionaron materia/s
        if (seccion === 'alumnos' || seccion === 'docentes') {
            if (checkMateria.length === 0) {
                setError('Por favor, corroborar que se hayan seleccionado al menos una Materia.')
                setEspera(false);
            } else {
                setError('');
            }
            if (seccion === 'alumnos') {
                //obtengo los ID que necesito para poder enviarlos a la base de datos.
                const idPersonaAlumno = refAlumno.current.value;
                const idPersonaTutor = refTutor.current.value;

                //obtengo el ID Tutor de la tabla Tutores.
                const idTutor = await EnviarData(`${Constantes.RUTA_API}/obtener_Idtutor.php`, idPersonaTutor);

                //damos de alta el alumno en base Alumno
                const dataAltaAlumno = {
                    "idPersonaAlumno": idPersonaAlumno,
                    "idTutor": idTutor[0].id_Tutor,
                }

                const insertAltaA = await EnviarData(`${Constantes.RUTA_API}/insert_alumno.php`, dataAltaAlumno);
                setError(insertAltaA.error);
                setSuccess(insertAltaA.msj);

                await timeout(500);//delay de 0.5 segundo

                //obtengo el idAlumno de la tabla alumnos
                const idAlumno = await EnviarData(`${Constantes.RUTA_API}/obtener_idAlumno.php`, idPersonaAlumno);
                await timeout(500);//delay de 0.5 segundo


                //por cada materia voy a darlo de alta en la tabla de alumno-materia
                for (var x = 0; x < checkMateria.length; x++) {

                    await timeout(500);//delay de 0.5 segundo

                    const dataAlumnoM = {
                        "idAlumno": idAlumno.id_Alumno,
                        "materia": checkMateria[x],
                    }

                    const insertAMDb = await EnviarData(`${Constantes.RUTA_API}/insert_alumnoM.php`, dataAlumnoM);
                    setError(insertAMDb.error);
                    setSuccess(insertAMDb.msj);

                    //deseleccion de materias, para nueva carga.
                    handlerUncheckM();
                    //limpio array checkMateria
                    setCheckMateria([]);

                    await timeout(500);//delay de 0.5 segundo
                    setSuccess('');
                    setEspera(false);

                }
            }
            if (seccion === 'docentes') {
                //obtengo los ID que necesito para poder enviarlos a la base de datos.
                const idPersonaProfesor = refProf.current.value;
                const nroLegajo = randomInt(99999999);

                //damos de alta el profesor en base profesor
                const dataAltaProf = {
                    "idPersonaProfesor": idPersonaProfesor,
                    "nroLegajo": nroLegajo,
                }

                //hago insert en tabla Profesor
                const insertAltaP = await EnviarData(`${Constantes.RUTA_API}/insert_profesor.php`, dataAltaProf);
                setError(insertAltaP.error);
                setSuccess(insertAltaP.msj);

                //obtengo el idProfesor de la tabla profesor
                const idProfesor = await EnviarData(`${Constantes.RUTA_API}/obtener_idProfesor.php`, idPersonaProfesor);
                await timeout(500);//delay de 0.5 segundo

                //por cada materia voy a darlo de alta en la tabla de profeso-materia.
                for (var k = 0; k < checkMateria.length; k++) {

                    await timeout(500);//delay de 0.5 segundo

                    const dataProfesorM = {
                        "idProfesor": idProfesor.id_Profesor,
                        "materia": checkMateria[k],
                    }

                    //hago insert en tabla profesorMateria.
                    const insertPMDb = await EnviarData(`${Constantes.RUTA_API}/insert_profesorM.php`, dataProfesorM);
                    setError(insertPMDb.error);
                    setSuccess(insertPMDb.msj);

                    //deseleccion de materias, para nueva carga.
                    handlerUncheckM();
                    //limpio array checkMateria
                    setCheckMateria([]);

                    await timeout(500);//delay de 0.5 segundo
                    setSuccess('');
                    setEspera(false);
                }
            }
        }
        //En el caso de Preceptores, consultamos si seleccionaron curso/s
        if (seccion === 'preceptores') {
            if (checkCurso.length === 0) {
                setError('Por favor, corroborar que se hayan seleccionado al menos un Curso.')
                setEspera(false);
            } else {
                setError('');
            }

            //obtengo los valores que necesito para poder enviarlos a la base de datos.
            const idPersonaPreceptor = refPrecep.current.value;
            const idInst = refInst.current.value;
            const curso1 = checkCurso[0];
            var curso2 = checkCurso[1];
            var curso3 = checkCurso[2];

            if (checkCurso[1] === undefined){
                curso2 = 1
                curso3 = 1
            }

            if (checkCurso[2] === undefined){
                curso3 = 1
            }

            //damos de alta el profesor en base profesor
            const dataAltaPrec = {
                "idPersonaPreceptor": idPersonaPreceptor,
                "idInst": idInst,
                "curso1": curso1,
                "curso2": curso2,
                "curso3": curso3
            }

            //hago insert en tabla Preceptor
            const insertAltaPre = await EnviarData(`${Constantes.RUTA_API}/insert_preceptor.php`, dataAltaPrec);
            setError(insertAltaPre.error);
            setSuccess(insertAltaPre.msj);

            //deseleccion de materias, para nueva carga.
            handlerUncheckC();
            //limpio array checkMateria
            setCheckCurso([]);

            await timeout(500);//delay de 0.5 segundo
            setSuccess('');

            setEspera(false);
            
        }
    }


    return (
        <div className='contenedor'>
            <div className='title-section'>
                <h1 className='title-form'>Crear {seccion === 'anioLectivo' ? 'Año Lectivo' : seccion}</h1>
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
                <span>Se asociara a los {seccion} a cursos o materias. En caso de Alumnos tambien se le asociara el Padre/Madre o Tutor.</span>
            </div>
            <form className='form-crear' onSubmit={handleCrear}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="nombre">Persona</label>
                        {seccion === 'alumnos' ?
                            <select id="inputAlumno" className="form-control form-inputs-crear" ref={refAlumno}>
                                <option defaultValue={""}>Elegir...</option>
                                {arregloAlumnos.map((alumno, index) => <option key={index} value={alumno.id_Persona}>{alumno.Ncompleto}</option>)}
                            </select> :
                            ''}
                        {seccion === 'docentes' ?
                            <select id="inputProfesores" className="form-control form-inputs-crear" ref={refProf}>
                                <option defaultValue={""}>Elegir...</option>
                                {arregloProfesores.map((profesor, index) => <option key={index} value={profesor.id_Persona}>{profesor.Ncompleto}</option>)}
                            </select> :
                            ''}
                        {seccion === 'preceptores' ?
                            <select id="inputPreceptores" className="form-control form-inputs-crear" ref={refPrecep}>
                                <option defaultValue={""}>Elegir...</option>
                                {arregloPreceptores.map((preceptor, index) => <option key={index} value={preceptor.id_Persona}>{preceptor.Ncompleto}</option>)}
                            </select> :
                            ''}
                    </div>
                    {varios ?
                        <div className="form-group col-md-4">
                            <label htmlFor="inputInstitucion">Institución</label>
                            <select id="inputInstitucion" className="form-control form-inputs-crear" ref={refInst}>
                                <option defaultValue={""}>Elegir...</option>
                                {arregloInst.map((inst, index) => <option key={index} value={inst.Id_Inst}>{inst.Nombre}</option>)
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
                                ref={refInst}
                            />
                        </div>}
                    {//Si la seccion es Preceptor, mostrará este campo, de no serlo, estará oculto
                        seccion === 'preceptores' ?
                            <div className='titulo-seccion'>
                                <label htmlFor="cursos">Cursos</label>
                            </div>
                            :
                            <div className='desaparecer'>
                                <label htmlFor="cursos">Cursos</label>
                            </div>
                    }
                    {
                        seccion === 'preceptores' ?
                            arregloCursos.map((curso, indice) =>
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
                                </div>)
                            :
                            <div className='desaparecer' />
                    }

                    {
                        seccion === 'alumnos' || seccion === 'docentes' ?
                            <div className='titulo-seccion'>
                                <label htmlFor="materias">Materias</label>
                            </div>
                            :
                            ''
                    }
                    {
                        seccion === 'alumnos' || seccion === 'docentes' ?
                            arregloMaterias.map((materia, ind) =>
                                <div className="form-check" key={ind}>
                                    <input
                                        className="form-check-input form-enable-materia"
                                        type="checkbox"
                                        value={materia.Id_Materia}
                                        id={materia.Id_Materia}
                                        onClick={handleCheckM}
                                    />
                                    <label className="form-check-label" htmlFor="defaultCheck2">
                                        {materia.Nombre}
                                    </label>
                                </div>)
                            :
                            ''
                    }
                    {
                        seccion === 'alumnos' ?
                            <div className="form-group col-md-8 titulo-seccion">
                                <label htmlFor="nombre">Padre-Madre/Tutor</label>
                                <select id="inputTutor" className="form-control form-inputs-crear" ref={refTutor}>
                                    <option defaultValue={""}>Elegir...</option>
                                    {arregloTutores.map((tutor, index) => <option key={index} value={tutor.id_Persona}>{tutor.NombreC}</option>)
                                    }
                                </select>
                            </div>
                            :
                            ''
                    }
                </div>
                <div className='botonesAnio'>
                    <button type="submit" disable={espera.stringify} className={espera ? 'btn disabled' : "btn btn-siguiente"}>Crear
                    </button>
                </div>
            </form >
        </div >
    )
}


export default FormAcademico