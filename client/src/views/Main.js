import React,{lazy, useEffect, useState} from 'react'
import Authentication from './Authentication';
import axios from 'axios';
import Authorization from './Authorization';
// import { BooksList } from '../components/BooksList';
axios.defaults.withCredentials=true;


export const Main = (props) => {

    const   [user, setUser]  = useState({_id:false,not_loaded:true});
    
    const loadUser=async ()=>{
        return  await axios.get("http://localhost:8000/api/user",{withCredentials:true})
        .then( (response)=>(response.data))
        .catch(err=>{
            if(err.response===undefined)
                return user;
            else{
                console.clear();
                return {_id:false};
            }
        })
    }
    useEffect(async() => {
        await setUser(await loadUser());
    }, [])
    if(user.not_loaded)
        return <div>loading</div>
    return !user._id? (
        <Authentication authenticateUser={async(user)=>setUser(await loadUser())}/>
        )
    :(
        <Authorization user={user} clearUser={()=>setUser({_id:false})}/>
    )
}
