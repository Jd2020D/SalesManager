import React,{useState,useEffect}  from 'react'
import LoginForm from '../components/LoginForm';
import axios from 'axios';
const source = axios.CancelToken.source();

const Authentication = (props) => {
    const {authenticateUser}=props;
    useEffect(() => {
        return () => {
            
        }
    }, [])

    const registerUser = async user =>{
        const errorArr = [];
        await axios.post("http://localhost:8000/api/register",user,{withCredentials:true,cancelToken:source.token})
            .then(async(response) => await authenticateUser(response.data.user))
            .catch(err =>{
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
            })
        return {errors:errorArr,source:source};
    }
    const loginUser =  async (user) =>{
        const errorArr = [];
        await axios.post("http://localhost:8000/api/login",user,{withCredentials:true,cancelToken:source.token})
            .then(async(response) => await authenticateUser(response.data.user))
            .catch(err =>{
            console.log(err)
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
            })
        return {errors:errorArr,source:source};
    }

    /* {viewRegisterForm&&<RegisterForm countries={countries} onSubmitProp={registerUser} changeView={changeView} />} */

    return (
        <div style={{display:'flex',justifyContent:'center'}}>
            <LoginForm onSubmitProp={loginUser}  /> 
        </div>

    )
}

export default Authentication
