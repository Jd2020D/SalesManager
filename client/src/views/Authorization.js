import React,{useState} from 'react'
import Books from './Books'
import axios from 'axios';
import { NavBar } from './NavBar';
import { CurrentPageComponent } from  './CurrentPageComponent';
import { AdminCurrentPageComponent } from  './AdminCurrentPageComponent';
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
        <NavBar changePage={(pageNumber)=>{setCurrentPage(pageNumber)}} logout={logout} isAdmin={user.Role.isAdmin}/>
        {user.Role.isAdmin?<AdminCurrentPageComponent changePage={(pageNumber)=>{setCurrentPage(pageNumber)}}  user={user} currentPageNumber={currentPage}/>
        :<CurrentPageComponent user={user} currentPageNumber={currentPage}/>}
        </>
    )
}

export default Authorization
