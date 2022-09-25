import Logo_icon from '../educati_img/logo-E-icon.png';
import Logo_full from '../educati_img/logo-principal-resize.png'
import Logo_half from '../educati_img/logo-secundario-half.png'
import Logo_half_full from '../educati_img/logo-secundario-login.png'
import '../css/logo.css'
import { Link } from 'react-router-dom'



export const LogoIcon = ({handler}) => {
    const isOpen = handler;
    return (
        <Link to="/home">
            <div className={isOpen ? "logoIcon" : "logo-close"} >
                <img src={Logo_icon} alt="Educati" />
            </div>
        </Link>
    )
}

export const LogoFull = ({handler}) => {
    const isOpen = handler;
    return (
        <Link to="/home">
            <div className={isOpen ? "logoFull" : "logo-close"} >
                <img src={Logo_full} alt="Educati" />
            </div>
        </Link>
    )
}

export const LogoHalf = ({handler}) => {
    const isOpen = handler;
    return (
        <Link to="/home">
            <div className={isOpen ? "logoHalf" : "logo-close"} >
                <img src={Logo_half} alt="Educati" />
            </div>
        </Link>
    )
}



export const LogoLogin = () => {
    return (
        <Link to="/home">
            <div className="logo-login" >
                <img src={Logo_half_full} alt="Educati" />
            </div>
        </Link>
    )
}