import React,{useState,useRef} from 'react'
import DetailsSidePanel from './DetailsSidePanel';
import CreateCustomer from './CreateCustomer';
import DealerForm from './DealerForm';
import CreateDealer from './CreateDealer';
import EditDealer from './EditDealer';
const SidePanels = ({
    sharedProps1,
    zoomHandler,
    deleteCustomer,
    activeMarkerPin,
    currentCustomerPanel,
    requestLocation,
    locationResponse,
    createMember,
    updateDealer
}) => {
    const [currentPanel,setCurrentPanel]=useState(0);
    const memberEdit=useRef();
        return currentPanel===0?
            <DetailsSidePanel
            {...sharedProps1}
            zoomHandler={zoomHandler}
            changeComponent={(num)=>setCurrentPanel(num)}
            activeMarkerPin={activeMarkerPin} 
            currentCustomerPanel={currentCustomerPanel} 
            deleteCustomer={deleteCustomer}
            editMember={(member)=>memberEdit.current=member}
            />
            :currentPanel===1&&sharedProps1.viewDealer?
            <CreateDealer  createDealer={createMember} locationResponse={locationResponse} requestLocation={requestLocation} changeComponent={(num)=>setCurrentPanel(num)}/>
            :currentPanel===1?
            <CreateCustomer createCustomer={createMember} locationResponse={locationResponse} requestLocation={requestLocation} changeComponent={(num)=>setCurrentPanel(num)}/>
            :currentPanel===2&&sharedProps1.viewDealer?
            <EditDealer updateDealer={updateDealer} locationResponse={locationResponse} requestLocation={requestLocation} dealer={memberEdit.current} changeComponent={(num)=>{setCurrentPanel(num);console.log(num)}} />
            :''
    
}

export default SidePanels
