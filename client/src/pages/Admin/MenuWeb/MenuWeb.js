import React, {useState, useEffect} from "react";
import {getAccessTokenApi} from '../../../Api/auth';

import {getBookApiActive} from '../../../Api/book';


import ListBooks from "../../../components/Admin/Books/ListBooks";



export default function Book() {

    const [usersActive, setUsersActive] = useState([]);
    const [usersInactive, setUsersInactive] = useState([]);
    const [reloadUsers, setReloadUsers] = useState(false);
    const token = getAccessTokenApi();
    useEffect(() => {
        getBookApiActive(token, true).then(response =>{
            setUsersActive(response.Books);
            console.log(response.Books);
        });
        getBookApiActive(token, false).then(response =>{
            setUsersInactive(response.Books);
            console.log(response.Books);
        });

        setReloadUsers(false)
    },[token, reloadUsers]);

    return(
        <div className="users">
            <ListBooks usersActive={usersActive} usersInactive={usersInactive} setReloadUsers={setReloadUsers} />
        </div>
    )
}