import React, { useState,useEffect } from "react"
import axios from 'axios';
const RegisterForm = props => {
    const { onSubmitProp,changeView, countries } = props;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [country, setCountry] = useState({name:'Selecet your country'});
    const [errors,setErrors]=useState([]);
    const onSubmit = async e => {
        e.preventDefault()
        const res=await onSubmitProp({firstName,lastName,email,password,confirmPassword,country});
        setErrors(res.errors);
        // if(res.errors.length<=0)
        //     res.source.cancel();

    }
    useEffect(() => {
        return () => {
        }
    }, [])
    return(
        <div className="container" style={{border:'1px solid black',height:'200px'}}>
            <div className="row">
                <div className="col-12">
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <form onSubmit={ onSubmit }>
                    <div className="form-group">
                            <label>First Name:</label>
                            <input onChange={(e)=>setFirstName(e.target.value)} value ={firstName} type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Last Name:</label>
                            <input onChange={(e)=>setLastName(e.target.value)} value ={lastName} type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>email:</label>
                            <input onChange={(e)=>setEmail(e.target.value)} value ={email} type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input onChange={(e)=>setPassword(e.target.value)} value ={password} type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Password Confirm:</label>
                            <input onChange={(e)=>setConfirmPassword(e.target.value)} value ={confirmPassword} type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Country:</label>
                            <select  value ={country} onChange={e => setCountry(e.target.value)}>
                            <option  value=''>{country.name}</option>
                            {countries.map((country, idx) => (
                                <option key={idx} value={country._id}>{country.name}</option>
                            ))}
                            </select>
                        </div>
                        <div className="form-group text-right">
                        <a onClick={()=>changeView()}  style={{textDecoration:'underline',color:'blue'}}>have an account?</a>
                            <button className="btn btn-primary btn-sm" style={{marginLeft: "10px"}}>Submit</button>
                        </div>
                    </form>
                    {errors.map((err, index) => <p key={index} style={{color:"red"}}>{err}</p>)}
                </div>
            </div>
        </div>
    )
}
export default RegisterForm;
