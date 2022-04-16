import React, { useState, useEffect } from "react";
import { getAccessTokenApi } from '../../../Api/auth';
import { getBookApiActive } from '../../../Api/book';
import ListBooks from "../../../components/Admin/Books/ListBooks";
import { Collapse, Input } from 'antd';



export default function Book() {
    const { Panel } = Collapse;
    const [usersActive, setUsersActive] = useState([]);
    const [usersInactive, setUsersInactive] = useState([]);
    const [reloadUsers, setReloadUsers] = useState(false);
    const [data, setdata] = useState("");
    const [autor, setAutor] = useState("");
    const [genre, setGenero] = useState("");
    const token = getAccessTokenApi();

    useEffect(() => {
        
        getBookApiActive(token, true).then(response => {
            const found = response.Books.filter(function (item) {
                let itemData = "";
                let textData = "";
                if (data) {
                    itemData = item.title.toLowerCase();
                    textData = data.toLowerCase();
                }
                if (autor) {
                    itemData = item.author.toLowerCase();
                    textData = autor.toLowerCase();
                }
                if (genre) {
                    itemData = item.genre.toLowerCase();
                    textData = genre.toLowerCase();
                }
                return itemData.indexOf(textData) > -1
            }
            )
            if (found) {
                setUsersActive(found);
            } else {
                setUsersActive(response.Books);
            }
        });
        getBookApiActive(token, false).then(response => {
            setUsersInactive(response.Books);
            console.log(response.Books);
        });

        setReloadUsers(false)
    }, [token, reloadUsers, data, autor, genre]);

    return (
        <div className="users">
            <Collapse accordion>
                <Panel header="Filtros" key="1">
                    <div className="input-caja">
                        <h3>Filtrar por titulo</h3>
                        <Input
                            placeholder="Titulo del libro"

                            size="large"

                            onChange={(e) => setdata(e.target.value)}
                        />
                    </div>
                    <div className="input-caja">
                        <h3>Filtrar por autor</h3>
                        <Input
                            placeholder="Nombre del autor"

                            size="large"

                            onChange={(e) => setAutor(e.target.value)}
                        />
                    </div>
                    <div className="input-caja">
                        <h3>Filtrar por genero</h3>
                        <Input
                            placeholder="Genero"

                            size="large"

                            onChange={(e) => setGenero(e.target.value)}
                        />
                    </div>
                </Panel>
            </Collapse>,
            <ListBooks usersActive={usersActive} usersInactive={usersInactive} setReloadUsers={setReloadUsers} />
        </div>
    )
}