import React,{useEffect} from 'react'
import Button from "@material-ui/core/Button";
import DealerForm from './DealerForm';
const EditDealer = ({
    changeComponent,
    requestLocation,
    locationResponse,
    dealer,
    updateDealer

}) => {
    useEffect(() => {
        
        return () => {
            requestLocation(true);
        }
    }, [])
    
    console.log(dealer);
    return (
        <div>

            <Button   variant="contained" color="secondary" onClick={e=>changeComponent(0)}>Back</Button>

        <DealerForm onSubmitProp={updateDealer}
        dealer={dealer} isEdit={true} changeComponent={changeComponent} title={"Edit Dealer"} locationResponse={locationResponse} requestLocation={requestLocation}   />
        </div>
        )
}

export default EditDealer
