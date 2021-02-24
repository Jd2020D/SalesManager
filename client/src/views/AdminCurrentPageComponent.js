import React,{useEffect,useState} from 'react'
import MapPanel from './MapPanel';
import CustomerTable from "./CustomerTable";
import DealersTable from "./DealersTable";
import axios from 'axios';

export const AdminCurrentPageComponent = ({
    currentPageNumber,
    user
}) => {
    const [dealers, setDealers] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8000/api/users/dealers/",{withCredentials:true})
            .then(response=>{
                setDealers(response.data);
            })
            .catch(err=>console.log(err))
    }, [])

    const updateDealer=(updateDealer,email=false,username=false)=>{
        const check=!email?delete updateDealer['email']:username?delete updateDealer['username']:false
        axios.put("http://localhost:8000/api/users/update/"+updateDealer._id,updateDealer,{withCredentials:true})
        .then(response=>{
            console.log(response.data)
                setDealers(dealers.map((dealer)=>dealer._id===updateDealer._id?response.data:dealer));
        })
        .catch(err=>console.log(err))
    }

    const deleteDealer=(dealerToDelete)=>{
        console.log(dealerToDelete)
        axios.delete("http://localhost:8000/api/users/delete/"+dealerToDelete._id,{withCredentials:true})
        .then(response=>{
                setDealers(dealers.filter((dealer)=>dealer._id!==dealerToDelete._id));
        })
        .catch(err=>console.log(err))

    }
    dealers.length>0&&console.log('dealers',dealers[0].location)
    return currentPageNumber===0&&dealers.length>0?<MapPanel  viewDealer={true} deleteMember={deleteDealer} updateMember={updateDealer} members={dealers} user={user}/>
    :currentPageNumber===1?<div><DealersTable/></div>
    :''
}

