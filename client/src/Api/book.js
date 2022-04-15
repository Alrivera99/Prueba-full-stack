import {basePath, apiVersion} from './config';

export function getBookApi(token){
    const url = `${basePath}/${apiVersion}/books`

    const params ={
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    };
    return fetch(url, params)
            .then(response => {
                return response.json()
            })
                .then(result => {
                    return result;
                })
                .catch(err =>{
                    return err.message;
                });
}
        
        
export function getBookApiActive(token, status){
            const url = `${basePath}/${apiVersion}/book-active?active=${status}`
        
            const params ={
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            };
            
            return fetch(url, params)
                    .then(response => {
                        return response.json()
                    })
                        .then(result => {
                            return result;
                        })
                        .catch(err =>{
                            return err.message;
                        });
}    

export function uploadAvatarApi(token, avatar, userBook){
    const url = `${basePath}/${apiVersion}/upload-avatar-book/${userBook}`;

    const formData = new FormData();

    formData.append("avatar", avatar, avatar.name);

    const params = {
        method: "PUT",
        body: formData,
        headers:{
            Authorization: token
        }
    };

    return fetch(url, params)
        .then(response =>{
            return response.json();
        })
        .then(result =>{
            return result;
        })
        .catch(err =>{
            return err.message;
        });

}

export function getAvatarApi(avatarName){
    const url = `${basePath}/${apiVersion}/get-avatar-book/${avatarName}`;

    return fetch(url)
        .then(response =>{
            return response.url;
        })
        .catch(err =>{
            return err.message
        });
}


export function deleteBookApi(token, bookBook){
    const url = `${basePath}/${apiVersion}/delete-book/${bookBook}`

    const params ={
        method: "DELETE",
        headers:{
            "Content-Type": "application/json",
            Authorization: token
        }
    }
    return fetch(url, params)
    .then(response =>{
        return response.json();
    })
    .then(result =>{
        return result.message;
    })
    .catch(err =>{
        return err.message;
    });
}

export function updateBookApi(token, book, bookId){
    const url = `${basePath}/${apiVersion}/update-book/${bookId}`;

    const params ={
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(book)
    };

    return fetch(url, params)
    .then(response =>{
        return response.json();
    })
    .then(result =>{
        return result;
    })
    .catch(err =>{
        return err.message;
    });
}


export function createBookApi(token, data){
    const url = `${basePath}/${apiVersion}/create-book`

    const params= {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(data)
    }

    return fetch(url, params)
    .then(response =>{
        return response.json();
    })
    .then(result =>{
        return result.message;
    })
    .catch(err =>{
        return err.message;
    });
}