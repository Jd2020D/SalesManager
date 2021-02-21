import React from 'react'

const customersArr=[
    {
        _id:1,firstName:"jehad",lastName:"jaber",location:{lat:0,lng:0}
    },
    {
        _id:2,firstName:"nor",lastName:"df",location:{lat:0,lng:0}
    },
    {
        _id:3,firstName:"afs",lastName:"fd",location:{lat:0,lng:0}
    }

]

const DetailsSidePanel = ({
    customers,
    zoomScale,
    zoomHandler,
    currentCustomer,
    deleteCustomer,
    activeMarkerPin,
    toggleCustomer,
    currentCustomerPanel,
    changeComponent
    }) => {
    return (
        <div>
                <button onClick={e=>changeComponent(1)}>Add</button> 
        <input type="range" value={zoomScale} min="0" max="18" onChange={e=>zoomHandler(e.target.value)}/>
        {
        // markers.map((marker,index)=>{
        //     return <div  key={index}>
        //             <p> {marker.lat} {marker.lng} </p>
        //             <button onClick={e=>setMarkers(markers.filter((item,index)=>item.lat!==marker.lat&&item.lng!==marker.lng))}>Delete</button>
        //             <button></button>
        //     </div>
        // })
        customers.map((customer,index)=>{
                return <div  ref={currentCustomer._id===customer._id?currentCustomerPanel:null} style={currentCustomer._id===customer._id?{background:'green'}:{}} key={index}>
                        <div onClick={e=>{toggleCustomer(customer);}} style={{background:'grey'}} >
                        <p>{customer._id} {customer.firstName} {customer.lastName}</p>
                        <p>{customer.location.lat} {customer.location.lng} </p>
                        {/* <button onClick={e=>setCustomers(customers.filter((customers,index)=>item.lat!==marker.lat&&item.lng!==marker.lng))}>Delete location</button> */}
                        </div>
                        {currentCustomer._id==customer._id&&activeMarkerPin?<button onClick={e=>toggleCustomer({_id:false})}>cancel</button>:<button onClick={e=>toggleCustomer(customer,true)}>change</button>}
                        <button onClick={e=>deleteCustomer(customer)}>Delete</button>

                </div>
            })
        }


        </div>
    )
}

export default DetailsSidePanel
