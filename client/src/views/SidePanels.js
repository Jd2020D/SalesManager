import React,{useState} from 'react'
import DetailsSidePanel from './DetailsSidePanel';
import CreateCustomer from './CreateCustomer';

const SidePanels = ({
    sharedProps1,
    zoomHandler,
    deleteCustomer,
    activeMarkerPin,
    currentCustomerPanel,
    requestLocation,
    locationResponse

}) => {
    const [currentPanel,setCurrentPanel]=useState(0);

        return currentPanel===0?
            <DetailsSidePanel
            {...sharedProps1}
            zoomHandler={zoomHandler}
            changeComponent={(num)=>setCurrentPanel(num)}
            activeMarkerPin={activeMarkerPin.current} 
            currentCustomerPanel={currentCustomerPanel} 
            deleteCustomer={deleteCustomer}
            />
            :currentPanel===1?
            <CreateCustomer locationResponse={locationResponse} requestLocation={requestLocation} changeComponent={(num)=>setCurrentPanel(num)}/>
            :''
    
}

export default SidePanels
