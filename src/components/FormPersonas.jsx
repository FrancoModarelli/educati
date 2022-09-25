import React, { useEffect, useState, useRef, useContext } from 'react'
import { Volver } from '../components/buttons/Volver'
import { UserContext } from '../Context/UserContext';
import EnviarData from './EnviarData';
import Constantes from './Constantes';
import timeout from '../Helpers/timeout'




const FormPersonas = ({ seccion }) => {


    //contexto para traer el id de institucion
    const { conectado } = useContext(UserContext);

    //state para mostrar el error o success
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    //state para guardar nombre de la institucion
    const [nombreInst, setNombreInst] = useState('')
    //state para poder utilizar los datos de la respuesta del array
    const [arregloInst, setArregloInst] = useState([])
    //state para poder utilizar los datos de la respuesta del array
    const [arregloPerfil, setArregloPerfil] = useState([])
    //state para poder utilizar los datos de la respuesta del array
    const [arregloDoc, setArregloDoc] = useState([])
    //state para poder utilizar los datos de la respuesta del array
    const [arregloSexo, setArregloSexo] = useState([])
    //State Flags
    const [espera, setEspera] = useState(false);
    const [varios, setVarios] = useState(false);


    //uso de referencia para obtener el valor del campo
    const refNombre = useRef(null);
    const refApellidoP = useRef(null);
    const refApellidoM = useRef(null);
    const refBotonApeM = useRef(null);
    const refFechaNac = useRef(null);
    const refTel = useRef(null);
    const refTdoc = useRef(null);
    const refNdoc = useRef(null);
    const refDir = useRef(null);
    const refSexo = useRef(null);
    const refUsuario = useRef(null);
    const refInst = useRef(null);
    const refClave = useRef(null);
    const refPerfil = useRef(null);


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
            console.log(dataInst)
        }
        obtenerDataDoc(`${Constantes.RUTA_API}/obtener_TipoDoc.php`);
        obtenerSexo(`${Constantes.RUTA_API}/obtener_Sexo.php`);
        obtenerDataPerfil(`${Constantes.RUTA_API}/obtener_perfil.php`);
    }
    //funcion para recibir la data de todas las instituciones.
    const obtenerDataInst = async (url) => {
        await fetch(url)
            .then(resp => resp.json())
            .then(json => {
                const respuestaInst = json;
                setArregloInst(respuestaInst);
            })
    }
    //funcion para recibir la data de todas las instituciones.
    const obtenerDataPerfil = async (url) => {
        await fetch(url)
            .then(resp => resp.json())
            .then(json => {
                const respuestaPerfil = json;
                handlerPerfil(respuestaPerfil);
            })
    }
    //funcion para quitar el perfil Admin cuando el usuario no lo es
    const handlerPerfil = (respuestaPerfil) => {
        var updatedListP = [...respuestaPerfil];
        if (conectado.id_Perfil !== 1) {
            updatedListP.splice(respuestaPerfil, 2);
            setArregloPerfil(updatedListP);
        } else {
            setArregloPerfil(respuestaPerfil);
        }
    }
    //funcion para recibir la data de los tipos de documento.
    const obtenerDataDoc = async (url) => {
        await fetch(url)
            .then(resp => resp.json())
            .then(json => {
                const respuestaDoc = json;
                setArregloDoc(respuestaDoc);
            })
    }
    //funcion para recibir la data de los generos.
    const obtenerSexo = async (url) => {
        await fetch(url)
            .then(resp => resp.json())
            .then(json => {
                const respuestaSexo = json;
                setArregloSexo(respuestaSexo);
            })
    }
    //cambiar estado para mostrar el input de ApellidoM
    const handleApellidoM = () => {

        if (refBotonApeM.current.checked) {
            refApellidoM.current.hidden = false
        } else {
            refApellidoM.current.hidden = true
        }
    }
    //bloqueamos que pueda ingresar caracteres.
    const controlNumber = (e) => {
        const valor = e.target.value;
        e.target.value = valor.replace(/[^A-Z\d-]/g, "")
    }
    //bloquear espacios en blanco en usuario y clave
    const controlSpace = (e) => {
        const valorS = e.target.value;
        e.target.value = valorS.replace(/\s/, "")
    }
    //Obtengo los Id de los campos que necesito
    const obtenerId = (ref) => {
        var valor = ref.current.value
        return valor.substring(0, 1);
    }
    //manejador para enviar datos ingresados en el form
    const handleCrear = async (evento) => {

        setEspera(true);
        evento.preventDefault();

        //primero creamos el usuario
        const Id_Perfil = obtenerId(refPerfil);
        const dataUser = {
            "usuario": refUsuario.current.value,
            "perfil": Id_Perfil,
            "clave": refClave.current.value
        }
        const insertDb_Usuario = await EnviarData(`${Constantes.RUTA_API}/insert_usuario.php`, dataUser);
        setError(insertDb_Usuario.error);

        //vamos a obtener el id del usuario creado para poder asociarlo a la persona
        if (insertDb_Usuario.isOk) {

            const idUser = await EnviarData(`${Constantes.RUTA_API}/buscar_user.php`, refUsuario.current.value);
            setError(idUser.error)

            if (error) {
                setEspera(false);
            } else {

                //busco los ids
                const Id_Sexo = obtenerId(refSexo);
                const Id_TipoD = obtenerId(refTdoc);
                const Id_Inst = obtenerId(refInst);

                const dataPersona = {
                    "nombre": refNombre.current.value,
                    "apellidoP": refApellidoP.current.value,
                    "apellidoM": refApellidoM.current.value,
                    "fechaNac": refFechaNac.current.value,
                    "telefono": refTel.current.value,
                    "tipoD": Id_TipoD,
                    "nDoc": refNdoc.current.value,
                    "direccion": refDir.current.value,
                    "sexo": Id_Sexo,
                    "idUser": idUser.id,
                    "institucion": Id_Inst,
                }

                const insertDb_Persona = await EnviarData(`${Constantes.RUTA_API}/insert_persona.php`, dataPersona);
                setError(insertDb_Persona.error);
                setSuccess(insertDb_Persona.msj);

                if (error) {
                    setEspera(false);
                } else {

                    await timeout(500);
                    setEspera(false);

                    await timeout(500);
                    setSuccess('')
                    //limpiamos el form
                    refNombre.current.value = '';
                    refApellidoP.current.value = '';
                    refApellidoM.current.value = '';
                    refBotonApeM.current.value = '';
                    refFechaNac.current.value = '';
                    refTel.current.value = '';
                    refTdoc.current.value = 'Elegir...';
                    refNdoc.current.value = '';
                    refDir.current.value = '';
                    refSexo.current.value = 'Elegir...';
                    refUsuario.current.value = '';
                    refInst.current.value = 'Elegir...';
                    refClave.current.value = '';
                    refPerfil.current.value = 'Elegir...';
                }
            }//error
        } else {
            console.log("me fui al else")
            setEspera(false)
        }//isOK
    }//handler

    return (
        <div className='contenedor'>
            <div className='title-section'>
                <h1 className='title-form'>Alta {seccion}</h1>
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
                <span>Se dará de alta una nueva Persona y Usuario</span>
            </div>
            <div className='title-sub_section'>
                <h2 className='title-sub usuario__'>Crear Usuario</h2>
                <h2 className='title-sub persona__'>Crear Persona</h2>
            </div>
            <form className='form-crear' onSubmit={handleCrear}>
                <div className='form_usuario'>
                    <div className="form-group col-md-9">
                        <label htmlFor="usuario">Usuario</label>
                        <input
                            required
                            type="text"
                            className="form-control form-inputs-crear"
                            id="usuario"
                            placeholder="Usuario"
                            ref={refUsuario}
                            onChange={controlSpace}
                        />
                    </div>
                    <div className="form-group col-md-9">
                        <label htmlFor="clave">Clave de Acceso</label>
                        <input
                            required
                            type="password"
                            className="form-control form-inputs-crear"
                            id="clave"
                            placeholder="clave"
                            onChange={controlSpace}
                            ref={refClave}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputPerfil">Perfil</label>
                        <select id="inputPerfil" className="form-control form-inputs-crear" ref={refPerfil}>
                            <option defaultValue={""}>Elegir...</option>
                            {arregloPerfil.map((perfil, index) => <option key={index}>{perfil.Id_Perfil + " - " + perfil.TipoP}</option>)
                            }
                        </select>
                    </div>
                </div>
                <div className='form_persona'>
                    <div className='personal'>
                        <div className='form-row'>
                            <div className="form-group col-md-9">
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control form-inputs-crear"
                                    id="nombre"
                                    placeholder="Nombre"
                                    ref={refNombre}
                                />
                            </div>
                            <div className="form-group col-md-9">
                                <label htmlFor="apellidoP">Apellido Paterno</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control form-inputs-crear"
                                    id="apellidoP"
                                    placeholder="Apellido Paterno"
                                    ref={refApellidoP}
                                />
                                <div className="form-switch">
                                    <label className="apeM" htmlFor="flexSwitchCheckDefault">
                                        Apellido Materno
                                    </label>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="flexSwitchCheckDefault"
                                        onChange={handleApellidoM}
                                        ref={refBotonApeM}
                                    />
                                    <input
                                        type="text"
                                        className="form-control form-inputs-crear"
                                        id="apellidoM"
                                        placeholder="Apellido Materno"
                                        ref={refApellidoM}
                                        hidden
                                    />
                                </div>
                            </div>
                            <div className='fechaNac'>
                                <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                                <div className="inline">
                                    <input
                                        type="date"
                                        data-date-format="DD MM YYYY"
                                        id="date_timepicker_start"
                                        ref={refFechaNac}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputSexo">Genero</label>
                                <select id="inputSexo" className="form-control form-inputs-crear" ref={refSexo}>
                                    <option defaultValue={""}>Elegir...</option>
                                    {arregloSexo.map((sexo, index) => <option key={index}>{sexo.Id + " - " + sexo.Genero}</option>)
                                    }
                                </select>
                            </div>
                        </div>{/*row-personal*/}
                    </div >
                    <div className='general'>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="telefono">Telefono</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control form-inputs-crear"
                                    id="telefono"
                                    placeholder="Telefono"
                                    ref={refTel}
                                    maxLength='10'
                                    onChange={controlNumber}
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputTdoc">Tipo Documento</label>
                                <select id="inputTdoc" className="form-control form-inputs-crear" ref={refTdoc} >
                                    <option defaultValue={""}>Elegir...</option>
                                    {arregloDoc.map((doc, index) => <option key={index}>{doc.Id + " - " + doc.TipoD}</option>)
                                    }
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="documento">Nro Documento</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control form-inputs-crear"
                                    id="documento"
                                    placeholder="Nro Documento"
                                    ref={refNdoc}
                                    maxLength='15'
                                    minLength='9'
                                    onChange={controlNumber}
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
                                    maxLength='50'
                                />
                            </div>
                            {varios ?
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputInstitucion">Institución</label>
                                    <select id="inputInstitucion" className="form-control form-inputs-crear" ref={refInst} >
                                        <option defaultValue={""}>Elegir...</option>
                                        {arregloInst.map((inst, index) => <option key={index}>{inst.Id_Inst + " - " + inst.Nombre}</option>)
                                        }
                                    </select>
                                </div>
                                : <div className="form-group col-md-9">
                                    <label htmlFor="institucion">Institución</label>
                                    <input
                                        type="text"
                                        readOnly
                                        className="form-control-plaintext plano"
                                        id="institucion"
                                        placeholder="Password"
                                        value={nombreInst}
                                        ref={refInst}
                                        disabled
                                    />
                                </div>}
                        </div>
                    </div>
                </div > {/*row*/}
                <div div className='botonesAnio' >
                    <button type="submit" disable={espera.stringify} className={espera ? 'btn disabled' : "btn btn-siguiente"}>
                        Crear
                    </button>
                </div>
            </form >
        </div >
    )
}

export default FormPersonas