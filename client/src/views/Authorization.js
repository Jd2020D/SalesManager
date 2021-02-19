import React from 'react'
import Books from './Books'
import axios from 'axios';

const Authorization = (props) => {
    const {user ,clearUser} =props;
    const logout =()=>{
        axios.get("http://localhost:8000/api/logout")
        .then(()=>{
            clearUser();
        })
        .catch(err=>console.log(err))

    }
    return (
        <>
        <h1>welcome {user.firstName} {user.lastName}</h1>
        <h3>Country: {user.country.name}</h3>
        <button onClick={e=>logout()}>log out</button>
        <Books books={user.books} userId={user._id}/>
        </>
    )
}

export default Authorization
