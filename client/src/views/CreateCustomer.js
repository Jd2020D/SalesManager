import React,{useEffect} from 'react'
import CustomerForm from './CustomerForm';
import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
const CreateCustomer = ({
    changeComponent,
    requestLocation,
    locationResponse,
    createCustomer

}) => {
    useEffect(() => {
        
        return () => {
            requestLocation(true);
        }
    }, [])

    return (
        <div>

            <Button   variant="contained" color="secondary" onClick={e=>changeComponent(0)}>Back</Button>


        <CustomerForm changeComponent={changeComponent} isEdit={false} title={"Create Customer"} customer={{firstName:"",lastName:"",phone:"",email:"",location:{}}}
         locationResponse={locationResponse} requestLocation={requestLocation}  onSubmitProp={createCustomer} />
        
        </div>
        )
}

export default CreateCustomer
