import React,{useState} from 'react'
import MapPanel from './MapPanel';
import CustomerTable from "./CustomerTable";
import DealersTable from "./DealersTable";
import axios from 'axios';

export const CurrentPageComponent = ({
    currentPageNumber,
    user,
    isAdmin,
    updateDealers,
    isView,
}) => {
    console.log(user)
    const [customers, setCustomers] = useState(user.customers)

    const updateCustomer=async(updateCustomer,email=false,username=false)=>{
        const check=!email?delete updateCustomer['email']:false
        const errorArr = [];
        let success=false
        const route = isAdmin?"/api/dealers/"+user._id+"/updateCustomer/":"/api/dealers/updateCustomer/";
        await axios.put("http://localhost:8000"+route+updateCustomer._id,updateCustomer,{withCredentials:true})
        .then(response=>{
                success=true;
                console.log(response.data)
                if(isAdmin)updateDealers(response.data);
                setCustomers(response.data.customers);
        })
        .catch(err=>{ 
             console.log(err)
        try{
            const errorResponse = err.response.data.errors; // Get the errors from err.response.data
            for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                errorArr.push(errorResponse[key].message)
            }    
        }catch(e){
            console.log(e);
        }
    })
    return {errors:errorArr,success:success};
    }

    const deleteCutomer=(customerToDelete)=>{
        const route = isAdmin?"/api/dealers/"+user._id+"/deleteCustomer/":"/api/dealers/deleteCustomer/";

        axios.delete("http://localhost:8000"+route+customerToDelete._id,{withCredentials:true})
        .then(response=>{
                if(isAdmin)
                updateDealers(response.data);
                setCustomers(customers.filter((customer)=>customer._id!==customerToDelete._id))
        })
        .catch(err=>console.log(err))

    }

    const createCustomer=async(newCustomer)=>{
            const route = isAdmin?"/api/dealers/"+user._id+"/addCustomer/":"/api/dealers/addCustomer/";
            const errorArr = [];
            let success=false
            await axios.post("http://localhost:8000"+route,newCustomer,{withCredentials:true})
                .then((response) => {
                    if(isAdmin)
                    updateDealers(response.data);
                    console.log(response.data.customers)
                    setCustomers(response.data.customers)    
                    success=true
                })
                .catch(err =>{
                    console.log(err);
                    try{
                        const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                        for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                            errorArr.push(errorResponse[key].message)
                        }    
                    }catch(e){
                        console.log(e);
                    }
                })
            return {errors:errorArr,success:success};
        
    


    }


    return currentPageNumber===0?<MapPanel editMember={{isView:false}} initialView={[user.location.lat,user.location.lng]} createMember={createCustomer} deleteMember={deleteCutomer} updateMember={updateCustomer}    viewDealer={false} members={customers} user={user}/>
    :currentPageNumber===2?<div><CustomerTable customers={customers}/></div>
    :''
}
{/* <MapPanel  updateMember={updateCustomer}  viewDealer={false} createMember={createCustomer} deleteMember={deleteCustomer} updateMember={updateCustomer} members={user.customers} user={user}/> */}
