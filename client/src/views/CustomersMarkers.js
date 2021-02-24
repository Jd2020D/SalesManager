import React,{useState} from 'react'
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
           if (locationRequest.req){
                locationResponse(e.latlng);
            }

            else if(activeMarkerPin)
                {
                    updateCurrentCustomerLocation(e.latlng);
                }
        },  
    })
    try{
        map.setZoom(zoomScale);
        if(!(currentCustomer.activeMarkerPin||locationRequest.req))
            {
                map.flyTo(currentCustomer.location,zoomScale);
            }
}catch(e){
    }
    return (
        [...customers,{location:locationRequest}].map((customer,indx)=>{
                return customer.location&&customer.location.lat?<Marker
                key={indx}
                position={[customer.location.lat,customer.location.lng]}
                eventHandlers={{
                    click: (e) => {
                        toggleCustomer(customer);
                    },
                  }}
                >
{                customer.firstName&&<CustomPopUp message={customer.firstName+" "+customer.lastName} currentId={currentCustomer._id} iteratedId={customer._id}/>
}                </Marker>:''          
                
            
            })
    )   
}

export default CustomersMarkers
