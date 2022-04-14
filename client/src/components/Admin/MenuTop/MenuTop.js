import React from 'react';
import {Button} from 'antd';
import { MenuUnfoldOutlined, PoweroffOutlined,MenuOutlined} from '@ant-design/icons';
import LogoCompany from '../../../assets//img/jpg/logo-white.jpeg'

import {logout} from '../../../Api/auth'

import "./MenuTop.scss"

export default function MenuTop(props){
    const{menuCollapsed, setMenuCollapsed} = props;

    const logoutUser = () =>{
        logout();
        window.location.reload();
    }

    return (
        <div className="menu-top">
            <div className="menu_top_left">
                <h1 className="h1-title-banks">Library</h1>
                {/* <img className="menu-top__left-logo" src={LogoCompany}
                alt=" Owl Corporation" /> */}
                <Button type="link" onClick={()=> setMenuCollapsed(!menuCollapsed)}>
                {menuCollapsed ? <MenuOutlined /> : <MenuUnfoldOutlined />}
                </Button>
            </div>
            <div>
                <div className="menu-top__right">
                    <Button type="link"  onClick={logoutUser}>
                         <PoweroffOutlined />
                    </Button>
                </div>
            </div>
        </div>
    )
}