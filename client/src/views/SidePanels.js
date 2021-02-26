import React,{useState,useRef} from 'react'
import DetailsSidePanel from './DetailsSidePanel';
import CreateCustomer from './CreateCustomer';
import DealerForm from './DealerForm';
import CreateDealer from './CreateDealer';
import EditDealer from './EditDealer';
import EditCustomer from './EditCustomer';
const SidePanels = ({
    sharedProps1,
    zoomHandler,
    deleteCustomer,
    activeMarkerPin,
    currentCustomerPanel,
    requestLocation,
    locationResponse,
    createMember,
    updateMember,
    viewMember,
    editMember

}) => {
    const [currentPanel,setCurrentPanel]=useState(editMember.isView?2:0);
    const memberEdit=useRef(editMember);
    console.log(memberEdit)
        return currentPanel===0?
            <DetailsSidePanel
            {...sharedProps1}
            zoomHandler={zoomHandler}
            changeComponent={(num)=>setCurrentPanel(num)}
            activeMarkerPin={activeMarkerPin} 
            currentCustomerPanel={currentCustomerPanel} 
            deleteCustomer={deleteCustomer}
            editMember={(member)=>memberEdit.current=member}
            viewMember={viewMember}
            />
            :currentPanel===1&&sharedProps1.viewDealer?
            <CreateDealer  createDealer={createMember} locationResponse={locationResponse} requestLocation={requestLocation} changeComponent={(num)=>setCurrentPanel(num)}/>
            :currentPanel===1?
            <CreateCustomer createCustomer={createMember} locationResponse={locationResponse} requestLocation={requestLocation} changeComponent={(num)=>setCurrentPanel(num)}/>
            :currentPanel===2&&sharedProps1.viewDealer?
            <EditDealer updateDealer={updateMember} locationResponse={locationResponse} requestLocation={requestLocation} dealer={memberEdit.current} changeComponent={(num)=>{setCurrentPanel(num);console.log(num)}} />
            :currentPanel===2?
            <EditCustomer updateCustomer={updateMember} locationResponse={locationResponse} requestLocation={requestLocation} customer={memberEdit.current} changeComponent={(num)=>{setCurrentPanel(num);console.log(num)}} />
            :''
}

export default SidePanels
