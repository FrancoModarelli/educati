import React, { useState } from 'react';
import '../css/sidebar.css';
import { NavLink } from 'react-router-dom';
import { menuSideBar } from '../Helpers/menu';
import { LogoHalf, LogoIcon} from './Logo';
import { AiOutlineMenu } from 'react-icons/ai'


const SideBar = () => {

    const [isOpen, setIsOpen] = useState(true);

    const handlerMenu = () => {
        setIsOpen(!isOpen);

    }
    return (
        <div className="contaiter">
            <div className={isOpen ? "sidebar" : "sidebar-close"}>
                <div className="menuBars">
                    <div className={isOpen ? "bars" : "bars-close"}>
                        <AiOutlineMenu onClick={handlerMenu} />
                    </div>
                </div>
                <div className={isOpen ? "top_section" : "top_section-close"}>
                    {isOpen ? <LogoHalf handler={isOpen}/> : <LogoIcon handler={isOpen}/>}
                </div>
                {menuSideBar.map((item, index) => {
                    return (
                        <NavLink to={item.url} key={index} className="link" >
                            <div className={isOpen ? 'icon' : 'icon-close'}> {item.icon}</div>
                            <div className={isOpen ? "link_text" : "link_text-close"}>{item.title}</div>
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
}

export default SideBar;