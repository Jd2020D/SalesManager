import React from 'react'
import {Marker, Tooltip ,Popup,useMapEvents } from 'react-leaflet'

const CustomPopUp=({currentId,iteratedId,message})=>{
    if(currentId===iteratedId)
    try{
        return <Tooltip  permanent={true}>
        <span>{message}</span>
        </Tooltip>    
    }catch(e){
        return '';
    }
    else
    return '';


}
const CustomersMarkers = ({
    customers,
    activeMarkerPin,
    zoomScale,
    currentCustomer,
    updateCurrentCustomerLocation,
    toggleCustomer,
    locationRequest,
    locationResponse
    }) => {
    const map = useMapEvents({
        click(e) { 
            console.log(e.latlng)
            if (locationRequest)
                locationResponse(e.latlng);
            else if(activeMarkerPin)
                updateCurrentCustomerLocation(e.latlng);
        },  
    })
    try{
        map.setZoom(zoomScale);
        map.flyTo(currentCustomer.location,zoomScale);
    }catch(e){
    }
    return (
        customers.map((customer,indx)=>{
                return customer.location&&customer.location.lat?<Marker
                key={indx}
                position={[customer.location.lat,customer.location.lng]}
                eventHandlers={{
                    click: (e) => {
                        console.log(customer)
                        toggleCustomer(customer);
                    },
                  }}
                >
                <CustomPopUp message={customer.firstName+" "+customer.lastName} currentId={currentCustomer._id} iteratedId={customer._id}/>
                </Marker>:''          
                
            
            })
    )   
}

export default CustomersMarkers
