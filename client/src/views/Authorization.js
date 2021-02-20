import React,{useState} from 'react'
import Books from './Books'
import axios from 'axios';
// import MapPanel from './MapPanel';

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
        <button onClick={e=>logout()}>log out</button>
        {/*<MapPanel/>*/}
        </>
    )
}

export default Authorization
