import React, {useState, useEffect} from "react";
import {getAccessTokenApi} from '../../../Api/auth';
import "./Users.scss";
import {getUsersApiActive} from '../../../Api/user';


import ListUsers from "../../../components/Admin/Users/ListUsers";

export default function Users() {

    const [usersActive, setUsersActive] = useState([]);
    const [usersInactive, setUsersInactive] = useState([]);
    const [reloadUsers, setReloadUsers] = useState(false);
    const token = getAccessTokenApi();
    useEffect(() => {
        getUsersApiActive(token, true).then(response =>{
            setUsersActive(response.users);
            console.log(response.users);
        });
        getUsersApiActive(token, false).then(response =>{
            setUsersInactive(response.users);
        });

        setReloadUsers(false)
    },[token, reloadUsers]);

    return(
        <div className="users">
            <ListUsers usersActive={usersActive} usersInactive={usersInactive} setReloadUsers={setReloadUsers} />
        </div>
    )
}