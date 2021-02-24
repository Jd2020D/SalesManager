import React,{useEffect} from 'react'
import CustomerForm from './CustomerForm';
import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
import DealerForm from './DealerForm';
const CreateDealer = ({
    changeComponent,
    requestLocation,
    locationResponse,
    createDealer

}) => {
    useEffect(() => {
        
        return () => {
            requestLocation(true);
        }
    }, [])
    

    return (
        <div>

            <Button   variant="contained" color="secondary" onClick={e=>changeComponent(0)}>Back</Button>

        <DealerForm isEdit={false} dealer={{firstName:"",lastName:"",phone:"",email:"",username:"",location:{},region:""}} onSubmitProp={createDealer} changeComponent={changeComponent} title={"Add Dealer"} locationResponse={locationResponse} requestLocation={requestLocation}   />
        </div>
        )
}

export default CreateDealer
