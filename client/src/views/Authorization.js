import React,{useState} from 'react'
import Books from './Books'
import axios from 'axios';
import { NavBar } from './NavBar';
import { CurrentPageComponent } from  './CurrentPageComponent';
const Authorization = (props) => {
    const {user ,clearUser} =props;
    const [currentPage,setCurrentPage]=useState(0);
    const logout =()=>{
        axios.get("http://localhost:8000/api/logout")
        .then(()=>{
            clearUser();
        })
        .catch(err=>console.log(err))

    }
    return (    
        <>
        <NavBar changePage={(pageNumber)=>{setCurrentPage(pageNumber)}} isAdmin={user.Role.isAdmin}/>
        <h1>welcome {user.firstName} {user.lastName}</h1>
        <button onClick={e=>logout()}>log out</button>
        <CurrentPageComponent user={user} currentPageNumber={currentPage}/>
        </>
    )
}

export default Authorization
