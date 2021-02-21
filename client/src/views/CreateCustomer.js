import React from 'react'
import CustomerForm from './CustomerForm';
import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
const CreateCustomer = ({
    changeComponent,
    requestLocation,
    locationResponse

}) => {
    return (
        <div>

            <Button   variant="contained" color="secondary" onClick={e=>changeComponent(0)}>Back</Button>


        <CustomerForm title={"Create Customer"} locationResponse={locationResponse} requestLocation={requestLocation} />

        </div>
        )
}

export default CreateCustomer
