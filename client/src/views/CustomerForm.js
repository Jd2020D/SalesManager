import React, { useState,useEffect } from "react"
const CustomerForm = ({
    changeComponent,
    onSubmitProp,
    requestLocation,
    locationResponse
}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState({});
    const [firdge, setFridge] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [errors,setErrors]=useState([]);
    const onSubmit = async e => {
        e.preventDefault()
        const res=await onSubmitProp({firstName,lastName,email,phone,location,firdge,quantity});
        setErrors(res.errors);
        // if(res.errors.length<=0)
        //     res.source.cancel();

    }
    useEffect(() => {
        return () => {
        }
    }, [])
    useEffect(() => {
        if(locationResponse.lat)
            setLocation(locationResponse);
    }, [locationResponse])
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
                            <label>Phone Number:</label>
                            <input onChange={(e)=>setPhone(e.target.value)} value ={phone} type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Location:</label>
                            <span >{"lat: "+location.lat}</span>
                            <span >{"lng: "+location.lng}</span>
                        </div>
                        <div className="form-group">
                            <label>Fridge:</label>
                            <input onChange={(e)=>setFridge(e.target.value)} value ={firdge} type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Quantity:</label>
                            <input onChange={(e)=>setQuantity(e.target.value)} value ={quantity} type="text" className="form-control"/>
                        </div>

                        <div className="form-group text-right">
                            <button className="btn btn-primary btn-sm" style={{marginLeft: "10px"}}>Submit</button>
                        </div>
                    </form>

                    <button onClick={e=>requestLocation()}>requestLocation</button> 

                    {errors.map((err, index) => <p key={index} style={{color:"red"}}>{err}</p>)}
                </div>
            </div>
        </div>
    )
}
export default CustomerForm;
