import React,{useState,useRef} from 'react'
import MyMap from './MyMap';

import CustomersMarkers from './CustomersMarkers';
import SidePanels from './SidePanels';
// {currentComponent===0?<DetailsSidePanel 
//     {...sharedProps1}
//     zoomHandler={zoomHandler}
//     changeComponent={(num)=>setCurrentComponent(num)}
//     activeMarkerPin={activeMarkerPin.current} 
//     currentCustomerPanel={currentCustomerPanel} 
//     deleteCustomer={deleteCustomer}
//     />
//     //}CustomerForm should be inside CreateCustomer in case we make it reusable for both create and update!
//     :currentComponent===1?<CustomerForm locationResponse={locationToAdd} requestLocation={requestLocation} changeComponent={(num)=>setCurrentComponent(num)}/>
//     :''
//     }        

const customersArr=[
    {
        _id:1,firstName:"jehad",lastName:"jaber",location:{}
    },
    {
        _id:2,firstName:"nor",lastName:"df",location:{}
    },
    {
        _id:3,firstName:"afs",lastName:"fd",location:{}
    },
    {
        _id:4,firstName:"afs",lastName:"fd",location:{}
    },
    {
        _id:5,firstName:"afs",lastName:"fd",location:{}
    },
    {
        _id:6,firstName:"afs",lastName:"fd",location:{}
    },
    {
        _id:7,firstName:"afs",lastName:"fd",location:{}
    },
    {
        _id:8,firstName:"afs",lastName:"fd",location:{}
    },
    {
        _id:9,firstName:"afs",lastName:"fd",location:{}
    },
    {
        _id:10,firstName:"afs",lastName:"fd",location:{}
    },
    {
        _id:11,firstName:"afs",lastName:"fd",location:{}
    },

]
const MapPanel = (props) => {
    const [customers,setCustomers]=useState(customersArr);
    const [currentCustomer,setCurrentCustomer]=useState({_id:false});
    const [locationToAdd,setLocationToAdd]=useState({});
    const [zoomScale,setZoomScale]=useState(14);
    const activeMarkerPin= useRef(false);
    const currentCustomerPanel=useRef();
    console.log("render main")
    const zoomHandler=(scale)=>{
        setZoomScale(prev=>{
            return scale<0||scale>18?prev:scale;
        })
    }
    const updateCurrentCustomerLocation =(newMapLocation)=>{
        console.log(currentCustomer)
        setCustomers(customers=>{
            activeMarkerPin.current=false;
            return customers.map((customer,index)=>{
                return currentCustomer._id===customer._id?{...customer,location:{...newMapLocation}}:customer
            })
    
        }
        
        );
    }
    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }
    const  requestLocation=async()=>{
        setLocationToAdd({req:true})

    }
    const deleteCustomer=(deletedCustomer)=>{
        setCustomers(customers=>{
            return customers.filter((customer,index)=>customer._id!==deletedCustomer._id);
        })
    }
    const toggleCustomer=(customer,change=false)=>{
        //change being true if the customer toggled by button
        setCurrentCustomer(prevCustomer=>{
            if(!change&&prevCustomer._id===customer._id)
                return {_id:false};
            activeMarkerPin.current=change;
            return {_id:customer._id,location:customer.location};
        })
        // we dont want to focus on the customer panel if it toggled by button
        if(currentCustomerPanel.current&&!change)
            currentCustomerPanel.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
    const sharedProps1= {
        toggleCustomer,
        zoomScale,
        currentCustomer,
        customers
    }
    // console.log(currentComponent);
    return (
        <div style={{display:'flex',justifyContent:'center'}}>
        <MyMap marker={<CustomersMarkers
        {...sharedProps1}
        activeMarkerPin={activeMarkerPin.current} 
        updateCurrentCustomerLocation={updateCurrentCustomerLocation}
        locationRequest={locationToAdd.req}
        locationResponse={(location)=>setLocationToAdd(location)}
        />} />
        
        <SidePanels
                sharedProps1={sharedProps1}
                zoomHandler={zoomHandler}
                activeMarkerPin={activeMarkerPin.current} 
                currentCustomerPanel={currentCustomerPanel} 
                deleteCustomer={deleteCustomer}
                requestLocation={requestLocation} 
                locationResponse={locationToAdd}
        
        />
        </div>
    )
}

export default MapPanel
