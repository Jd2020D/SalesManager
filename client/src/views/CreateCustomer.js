import React from 'react'
import CustomerForm from './CustomerForm';
const CreateCustomer = ({
    changeComponent,
    requestLocation,
    locationResponse

}) => {
    return (
        <div>
        <button onClick={e=>changeComponent(0)}>Back</button> 
        <CustomerForm locationResponse={locationResponse} requestLocation={requestLocation} />
        </div>
        )
}

export default CreateCustomer
