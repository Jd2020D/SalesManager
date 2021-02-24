import React,{useState} from 'react'
import MapPanel from './MapPanel';
import CustomerTable from "./CustomerTable";
import DealersTable from "./DealersTable";
import axios from 'axios';

export const CurrentPageComponent = ({
    currentPageNumber,
    user,
    isAdmin,
    updateDealers
}) => {
    const [customers, setCustomers] = useState(user.customers)
    const updateCustomer=async(updateCustomer,email=false,username=false)=>{
        console.log(updateCustomer)
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

    // const deleteCutomer=(customerToDelete)=>{
    //     console.log(dealerToDelete)
    //     const route = isAdmin?"/api/dealers/"+user._id+"/deleteCustomer/":"/api/dealers/updateCustomer/";

    //     axios.delete("http://localhost:8000/api/users/delete/"+dealerToDelete._id,{withCredentials:true})
    //     .then(response=>{
    //             setDealers(dealers.filter((dealer)=>dealer._id!==dealerToDelete._id));
    //     })
    //     .catch(err=>console.log(err))

    // }



    return user.customers.length>0&&currentPageNumber===0?<MapPanel updateMember={updateCustomer}    viewDealer={false} members={customers} user={user}/>
    :currentPageNumber===2?<div><CustomerTable/></div>
    :''
}
{/* <MapPanel  updateMember={updateCustomer}  viewDealer={false} createMember={createCustomer} deleteMember={deleteCustomer} updateMember={updateCustomer} members={user.customers} user={user}/> */}
