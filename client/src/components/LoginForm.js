import React, { useState,useEffect } from "react"

const LoginForm = props => {
    const { onSubmitProp } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors,setErrors]=useState([]);

    const onSubmit = async e => {
        e.preventDefault()
        const res= await onSubmitProp({email,password});
        setErrors(res.errors);
        // if(res.errors.length<=0)
        //     res.source.cancel();

    }
    useEffect(() => {
        
        return () => {
            
        }
    }, [])

    return(
        <div className="container"  style={{border:'1px solid black',height:'200px'}} >
            <div className="row">
                <div className="col-12">
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <form onSubmit={ onSubmit }>
                        <div className="form-group">
                            <label>email:</label>
                            <input onChange={(e)=>setEmail(e.target.value)} value ={email} type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input onChange={(e)=>setPassword(e.target.value)} value ={password} type="text" className="form-control"/>
                        </div>
                        <div className="form-group text-right">
                            <button className="btn btn-primary btn-sm" style={{marginLeft: "10px"}}>Submit</button>
                        </div>
                    </form>
                    <p>{errors.map((err, index) => <small key={index} style={{color:"red"}}>{err}</small>)}</p>
                </div>
            </div>
        </div>
    )
}
export default LoginForm;
