import React, { useState, useEffect } from "react";
import { Switch, List, Avatar, Button, notification, Modal as ModalAntd } from 'antd'
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import { EditOutlined, StopOutlined, DeleteOutlined, CheckOutlined, ExceptionOutlined } from '@ant-design/icons';
import Modal from '../../../Modal';
import { ROLE } from "../../../../utils/constants";
import EditBookForm from "../EditBookForm";
import AddBookForm from "../AddBookForm"

import { getBookApiActive, getAvatarApi, deleteBookApi } from "../../../../Api/book"

import './ListBooks.scss';
import { getAccessTokenApi } from "../../../../Api/auth";

const { confirm } = ModalAntd;

export default function ListBooks(props) {
    const { usersActive, usersInactive, setReloadUsers } = props;
    const [viewUsersActives, setViewUsersActives] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [role, setrole] = useState(localStorage.getItem(ROLE))
    const [modalContent, setModalContent] = useState(null);

    const addUserModal = e => {
        setIsVisibleModal(true);
        setModalTitle("Creando un nuevo libro");
        setModalContent(
            <AddBookForm setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} />
        )
    }

    return (
        <div className="list-users">

            {
                role == "librarian" &&
                <div className="list-users__header">
                    <div className="list-users__header-switch">
                        <Switch
                            defaultChecked
                            onChange={() => setViewUsersActives(!viewUsersActives)}
                        />
                        <span>
                            {viewUsersActives ? "Libros Disponibles" : "Libros Agotados"}
                        </span>
                    </div>
                    <Button type="primary" onClick={addUserModal}>
                        Nuevo Libro
                    </Button>
                </div>
            }

            {viewUsersActives ? (
                <UsersActive userActive={usersActive} role={role} setIsVisibleModal={setIsVisibleModal} setModalTitle={setModalTitle} setModalContent={setModalContent} setReloadUsers={setReloadUsers} />
            ) : (
                <UsersInactive usersInactive={usersInactive} setReloadUsers={setReloadUsers} />
            )}

            <Modal
                title={modalTitle}
                isVisble={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>
        </div>
    );
}

function UsersActive(props) {
    const { userActive, setIsVisibleModal, setModalTitle, setModalContent, setReloadUsers, role } = props;

    const editUser = books => {
        setIsVisibleModal(true);
        setModalTitle(`Editar ${books.title ? books.title : "..."} de ${books.author ? books.author : "..."} `);
        setModalContent(<EditBookForm books={books} setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} />);
    }

    return (
        <List
            className="users-active"
            itemLayout="horizontal"
            dataSource={userActive}
            renderItem={books => <UserActive role={role} books={books} editUser={editUser} setReloadUsers={setReloadUsers} />}
        />
    )
}

function UserActive(props) {
    const { books, editUser, role, setReloadUsers } = props;

    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (books.avatar) {
            getAvatarApi(books.avatar).then(response => {
                setAvatar(response);
                console.log(response);
            })
        } else {
            setAvatar(null);
            console.log("no pasa");
        }
    }, [books])

    const showDeleteConfirm = e => {
        const accessToken = getAccessTokenApi();

        confirm({
            title: "Eliminando libro",
            content: `Estas seguro que quieres eliminar a  ${books.title}?`,
            okText: "Elimniar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                deleteBookApi(accessToken, books._id)
                    .then(response => {
                        notification["success"]({
                            message: response
                        });
                        setReloadUsers(true)
                    })
                    .catch(err => {
                        {
                            notification["error"]({
                                message: err
                            })
                        }
                    })
            }
        })
    }
    const ReservConfirm = e => {
        const accessToken = getAccessTokenApi();

        confirm({
            title: "Reservar este libro",
            content: `Estas seguro que quieres reservar el libro ${books.title} de ${books.author} ?`,
            okText: "Reservar",
            okType: "primary",
            cancelText: "Cancelar",
            onOk() {
                // deleteBookApi(accessToken, books._id)
                //     .then(response => {
                //         notification["success"]({
                //             message: response
                //         });
                //         setReloadUsers(true)
                //     })
                //     .catch(err => {
                //         {
                //             notification["error"]({
                //                 message: err
                //             })
                //         }
                //     })
            }
        })
    }

    return (
        <>

            {
                role == "student" ?
                    <List.Item

                        actions={[
                            <Button
                                type="primary"
                                onClick={ReservConfirm}
                            >
                                <ExceptionOutlined />
                            </Button>,
                            // <Button
                            //     type="danger"
                            //     onClick={desactiveUser}
                            // >
                            //     <StopOutlined />
                            // </Button>,
                            // <Button
                            //     type="danger"
                            // onClick={showDeleteConfirm}
                            // >
                            //     <EyeOutlined />
                            // </Button>

                        ]}
                    >

                        <List.Item.Meta

                            avatar={<Avatar className={avatar ? "image-book" : NoAvatar} src={avatar ? avatar : NoAvatar} />}
                            title={`
                                Titulo: ${books.title ? books.title : "..."}
                            
                            `}
                            description={`Año de publicacion: ${books.year}`}
                        />
                        <List.Item.Meta
                            title={`
                Autor: ${books.author ? books.author : "..."}
               
            `}
                            description={`Genero: ${books.genre}`}
                        />
                    </List.Item>

                    :
                    <List.Item

                        actions={[
                            <Button
                                type="primary"
                                onClick={() => editUser(books)}
                            >
                                <EditOutlined />
                            </Button>,
                            // <Button
                            //     type="danger"
                            //     onClick={desactiveUser}
                            // >
                            //     <StopOutlined />
                            // </Button>,
                            <Button
                                type="danger"
                                onClick={showDeleteConfirm}
                            >
                                <DeleteOutlined />
                            </Button>

                        ]}
                    >

                        <List.Item.Meta

                            avatar={<Avatar className={avatar ? "image-book" : NoAvatar} src={avatar ? avatar : NoAvatar} />}
                            title={`
                                Titulo: ${books.title ? books.title : "..."}
                            
                            `}
                            description={`Año de publicacion: ${books.year}`}
                        />
                        <List.Item.Meta
                            title={`
                Autor: ${books.author ? books.author : "..."}
               
            `}
                            description={`Genero: ${books.genre}`}
                        />
                    </List.Item>

            }
        </>

    )
}

function UsersInactive(props) {
    const { usersInactive, setReloadUsers } = props;
    return (
        <List
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersInactive}
            renderItem={user => <UserInactive user={user} setReloadUsers={setReloadUsers} />}
        />
    )
}

function UserInactive(props) {
    const { user, setReloadUsers } = props;

    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            })
        } else {
            setAvatar(null);
        }
    }, [user])

    const activeUser = e => {
        const accessToken = getAccessTokenApi();

        getBookApiActive(accessToken, user._id, true)
            .then(response => {
                notification["success"]({
                    message: response
                });
                setReloadUsers(true)
            }).catch(err => {
                notification["error"]({
                    message: err
                })
            })
    }
    const showDeleteConfirm = e => {
        const accessToken = getAccessTokenApi();

        confirm({
            title: "Eliminando usuario",
            content: `Estas seguro que quieres eliminar a  ${user.email}?`,
            okText: "Elimniar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                deleteBookApi(accessToken, user._id)
                    .then(response => {
                        notification["success"]({
                            message: response
                        });
                        setReloadUsers(true)
                    })
                    .catch(err => {
                        {
                            notification["error"]({
                                message: err
                            })
                        }
                    })
            }
        })
    }

    return (
        <List.Item
            actions={[
                <Button
                    type="primary"
                    onClick={activeUser}
                >
                    <CheckOutlined />
                </Button>,
                <Button
                    type="danger"
                    onClick={showDeleteConfirm}
                >
                    <DeleteOutlined />
                </Button>

            ]}
        >

            <List.Item.Meta
                avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
                title={`
                            ${user.name ? user.name : "..."}
                            ${user.lastname ? user.lastname : '...'}
                        `}
                description={user.email}
            />
        </List.Item>
    )
}