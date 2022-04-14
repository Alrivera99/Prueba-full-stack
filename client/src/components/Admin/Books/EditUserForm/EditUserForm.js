import React,{useCallback,useEffect, useState} from 'react';

import "./EditUserForm.scss"
import {Avatar,Form, Icon, Select, Button, Row,Col, Input, notification} from 'antd'
import {useDropzone} from 'react-dropzone';
import { HomeOutlined, MenuOutlined,UserOutlined,MailOutlined,LockOutlined} from '@ant-design/icons';

import NoAvatar from '../../../../assets/img/png/no-avatar.png'

import {updateBookApi, uploadAvatarApi, getAvatarApi} from "../../../../Api/book";
import {getAccessTokenApi} from "../../../../Api/auth";

export default function EditUserForm(props){
    const {books, setIsVisibleModal, setReloadUsers} = props;
    const [avatar, setAvatar] = useState(null);
    const [userData, setUserData] = useState({});

    useEffect(()=>{
        setUserData({
            title: books.title,
            author: books.author,
            year: books.year,
            genre: books.genre,
            avatar: books.avatar
        });
    }, [books]);

    useEffect(() =>{
        if(books.avatar){
            getAvatarApi(books.avatar).then(response =>{
                setAvatar(response);
                console.log(response);
            })
        } else{
            setAvatar(null);
        }
    },[books])

    useEffect(()=>{
        if(avatar){
            setUserData({...userData,avatar: avatar.file});
            console.log({...userData,avatar: avatar.file});
        }
    },[avatar])
    
    const updateUser = e =>{
        e.preventDefault();
        const token = getAccessTokenApi();
        let userUpdate = userData;
        console.log(userUpdate);
        if(!userUpdate.title || !userUpdate.author || !userUpdate.year  || !userUpdate.genre){
            notification["error"]({
                message: "El titulo, autor, año y genero son obligatorios"
            })
            return;
        }

        if(typeof userUpdate.avatar ==="object"){
            console.log("entro");
            uploadAvatarApi(token, userUpdate.avatar, books._id).then(response =>{
                userUpdate.avatar= response.avatarName;
                updateBookApi(token, userUpdate, books._id).then(result =>{
                    notification["success"]({
                        message: result.message
                    });
                    setIsVisibleModal(false);
                    setReloadUsers(true);
                })
            });
        }else{
            updateBookApi(token, userUpdate, books._id).then(result =>{
                notification["success"]({
                    message: result.message
                });
                setIsVisibleModal(false);
                setReloadUsers(true);
            })
        }
    };

    return(
        <div className="edit-user-form">
            <UploadAvatar avatar={avatar} setAvatar={setAvatar}/>
            <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser}/>
        </div>
    )
}

function UploadAvatar(props){
    const {avatar, setAvatar} = props;
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        if(avatar){
            if(avatar.preview){
                setAvatarUrl(avatar.preview)
            }else{
                setAvatarUrl(avatar);
            }
        }else{
            setAvatarUrl(null);
        }
    }, [avatar])

    const onDrop = useCallback(
        acceeptedFiles => {
            const file = acceeptedFiles[0];
            setAvatar({file, preview: URL.createObjectURL(file)})
        }, [setAvatar]
    );

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });
    return(
        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()}/>
            {isDragActive ? (
                <Avatar size={150} src={NoAvatar}/>
            ):(
                <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar}/>
            )}
        </div>
    )

}
    
function EditForm(props){
    const {userData, setUserData, updateUser} = props;
    const {Option} = Select;

    return (
        <Form className="form-edit" onSubmitCapture={updateUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input prefix={   <UserOutlined />} placeholder="Titulo"
                        value={userData.title}
                        onChange={e => setUserData({...userData, title: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                 <Col span={12}>
                <Form.Item>
                        <Input prefix={   <UserOutlined />} placeholder="Autor"
                        value={userData.author}
                        onChange={e => setUserData({...userData, author: e.target.value})}
                        />
                    </Form.Item>
                </Col> 
            </Row>
          <Row gutter={24}>
                <Col span={12}>
                <Form.Item>
                        <Input prefix={ <MailOutlined />} placeholder="Año de publicacion"
                        value={userData.year}
                        onChange={e => setUserData({...userData, year: e.target.value})}
                        />
                    </Form.Item>    
                </Col>
                <Col span={12}>
                <Form.Item>
                    <Select placeholder="Selecciona un rol:"
                        onChange={e => setUserData({...userData, genre: e})}
                        value={userData.genre}
                    >
                        <Option value="Masculino">Masculino</Option>
                        <Option value="Femenino">Femenino</Option>
                    </Select>
                </Form.Item>
                </Col>
            </Row> 
            {/* <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<LockOutlined/>}
                            type="password"
                            value={userData.password}
                            placeholder="Contraseña"
                            onChange={e=>
                                setUserData({...userData, password: e.target.value})
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item>
                        <Input
                            prefix={<LockOutlined/>}
                            type="password"
                            placeholder="Repetir Contraseña"
                            value={userData.repeatPassword}
                            onChange={e=>
                                setUserData({...userData, repeatPassword: e.target.value})
                            }
                        />
                    </Form.Item>
                </Col>
            </Row> */}
        <Form.Item>
            <Button type="primary" htmlType="submit" className="btn-submit">
                Actualizar Usuario
            </Button>
        </Form.Item>
        </Form>
    )
}