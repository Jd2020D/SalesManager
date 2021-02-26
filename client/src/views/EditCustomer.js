import React,{useEffect} from 'react'
import Button from "@material-ui/core/Button";
import CustomerForm from './CustomerForm';
const EditCustomer = ({
    changeComponent,
    requestLocation,
    locationResponse,
    customer,
    updateCustomer

}) => {
    useEffect(() => {
        
        return () => {
            requestLocation(true);
        }
    }, [])
    
    return (
        <div>

            <Button   variant="contained" color="secondary" onClick={e=>changeComponent(0)}>Back</Button>

        <CustomerForm onSubmitProp={updateCustomer}
        customer={customer} isEdit={true} changeComponent={changeComponent} title={"Edit Customer"} locationResponse={locationResponse} requestLocation={requestLocation}   />
        </div>
        )
}

export default EditCustomer
