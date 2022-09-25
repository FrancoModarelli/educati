//***************************************************************************************/
//Referencia de menuPerfil: 
//  Administrador:         100000
//  Director:              020000
//  Preceptor:             003000
//  Profesor:              000400
//  Padre-Madre/Tutor:     000050
//  Alumno:                000006
// Dependiendo de quienes puedan ver ese menu se asignará el numero en su posicion.
// Ejemplo: Home, el menuPerfil sera 123456 ya que todos lo pueden ver.
//**************************************************************************************/
import {
    AiOutlineLineChart,
    AiOutlineHighlight,
    AiOutlineCluster,
    AiOutlineTable,
    AiOutlineEye,
    AiOutlineNotification,
    AiOutlineContacts,
    AiOutlineDatabase,
    AiOutlineHome,
    AiOutlineCalendar,
} from 'react-icons/ai'
import Foto1 from '../educati_img/institucional/alumnos.jpg'
import Foto2 from '../educati_img/institucional/anio_lectivo.jpg'
import Foto3 from '../educati_img/institucional/docente.jpg'
import Foto4 from '../educati_img/institucional/institucion.jpg'
import Foto5 from '../educati_img/institucional/preceptor.jpg'
import Foto6 from '../educati_img/institucional/personas.jpg'

export const menuSideBar = [

    {
        title:"Home",
        url:"/home",
        icon:<AiOutlineHome/>,
        menuPerfil:"123456",
    },
    {
        title:"Asistencia",
        url:"/asistencia",
        icon:<AiOutlineHighlight/>,
        menuPerfil:"",
    },
    {
        title:"Clases",
        url:"/clases",
        icon:<AiOutlineCluster/>,
        menuPerfil:"",
    },
    {
        title:"Notas",
        url:"/notas",
        icon:<AiOutlineTable/>,
        menuPerfil:"",
    },
    {
        title:"Observaciones",
        url:"/observaciones",
        icon:<AiOutlineEye/>,
        menuPerfil:"",
    },
    {
        title:"Avisos",
        url:"/avisos",
        icon:<AiOutlineNotification/>,
        menuPerfil:"",
    },
    {
        title:"Evolutivo",
        url:"/evolutivo",
        icon:<AiOutlineLineChart/>,
        menuPerfil:"",
    },
    {
        title:"Reuniones",
        url:"/reuniones",
        icon:<AiOutlineContacts/>,
        menuPerfil:"",
    },
    {
        title:"Administración",
        url:"/adm_gral",
        icon:<AiOutlineDatabase/>,
        menuPerfil:"",
    },
    {
        title:"Calendario",
        url:"/calendario",
        icon:<AiOutlineCalendar/>,
        menuPerfil:"",
    },
];

export const menuAdmGral = [

    {
        title:'Año Lectivo',
        foto:Foto2,
        url:'/adm_gral/anioLectivo',
    },
    {
        title:'Institución',
        foto:Foto4,
        url:'/adm_gral/institucion',
    },
    {
        title:'Personas',
        foto:Foto6,
        url:'/adm_gral/personas',
    },
    {
        title:'Alumnos',
        foto:Foto1,
        url:'/adm_gral/alumnos',
    },
    {
        title:'Docentes',
        foto:Foto3,
        url:'/adm_gral/docentes',
    },
    {
        title:'Preceptores',
        foto:Foto5,
        url:'/adm_gral/preceptores',
    },
];

export const menuCtrlGral =[
    {
        title:'Alta ',
        url_ctl:'crear%',
    },
    {
        title:'Modificación ',
        url_ctl:'modificar%',
    },
    {
        title:'Eliminar ',
        url_ctl:'eliminar%',
    },
    {
        title:'Datos Actuales',
        url_ctl:'datosAct%'
    }
];

