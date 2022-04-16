import React from 'react'
import {Link, withRouter} from 'react-router-dom';
import {Layout, Menu} from 'antd'
import { HomeOutlined, BookOutlined ,UserOutlined,DollarOutlined } from '@ant-design/icons';
import './MenuSider.scss'

function MenuSlider(props){
   
    const{menuCollapsed, location,role} = props;
    const{Sider} = Layout;
    return(
        <Sider className="admin-sider" collapsed={menuCollapsed}>
           <Menu  theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
               <Menu.Item key="/admin">
                    <Link to={"/admin"}>
                        <HomeOutlined />
                        <span className="nav-text">Home</span>
                    </Link>
               </Menu.Item>
               {role == "librarian" && 
               <Menu.Item key="/admin/users">
                    <Link to="/admin/users">
                    <UserOutlined />
                        <span className="nav-text">Usuarios</span>
                    </Link>
               </Menu.Item> }
              
               <Menu.Item key="/admin/books">
                    <Link to="/admin/books">
                    <BookOutlined />
                        <span className="nav-text">Libros</span>
                    </Link>
               </Menu.Item>
           </Menu>
        </Sider>
        
    )
}
export default withRouter(MenuSlider);