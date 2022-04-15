import React, { useState } from 'react';
import { Form, Input, Select, Button, Row, Col, notification } from 'antd'
import { UserOutlined, MailOutlined, BookOutlined,CalendarOutlined } from '@ant-design/icons';
import {  createBookApi } from "../../../../Api/book"
import { getAccessTokenApi } from "../../../../Api/auth"
import "./AddBookForm.scss"

export default function AddBookForm(props) {
    const { setIsVisibleModal, setReloadUsers } = props;
    const [userData, setUserData] = useState({})

    const addUser = event => {
        event.preventDefault();

        if (!userData.title || !userData.author || !userData.year || !userData.genre) {
            notification["error"]({
                message: "Todos los campos son obligatorios"
            })
        } else if (userData.password !== userData.repeatPasswotd) {
            notification["error"]({
                message: "Las contraseñas tienen que ser iguales"
            })
        } else {
            const accessToken = getAccessTokenApi();

            createBookApi(accessToken, userData)
                .then(response => {
                    notification['success']({
                        message: response
                    })
                    setIsVisibleModal(false)
                    setReloadUsers(true);
                    setUserData({})
                }).catch(err => {
                    notification['error']({
                        message: err
                    })
                })
        }
    }

    return (
        <div className="add-user-form">
            <AddForm
                userData={userData}
                setUserData={setUserData}
                addUser={addUser}
            />
        </div>
    )
}


function AddForm(props) {
    const { userData, setUserData, addUser } = props;
    const { Option } = Select

    return (
        <Form className="form-add" onSubmitCapture={addUser}>
            <Row gutter={24}>
                <Col span="12">
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Titulo"
                            value={userData.title}
                            onChange={e => setUserData({ ...userData, title: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span="12">
                    <Form.Item>
                    <Form.Item>
                        <Input prefix={   <UserOutlined />} placeholder="Autor"
                        value={userData.author}
                        onChange={e => setUserData({...userData, author: e.target.value})}
                        />
                    </Form.Item>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span="12">
                <Form.Item>
                        <Input prefix={ <CalendarOutlined />} placeholder="Año de publicacion"
                        value={userData.year}
                        onChange={e => setUserData({...userData, year: e.target.value})}
                        />
                    </Form.Item>    
                </Col>
                <Col span="12">
                    <Form.Item>
                        <Input prefix={ <BookOutlined />} placeholder="Genero"
                        value={userData.genre}
                        onChange={e => setUserData({...userData, genre: e.target.value})}
                        />    
                    </Form.Item>
                </Col>
                
            </Row>
           
           
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">Crear libro</Button>
            </Form.Item>
        </Form>
    )
}
