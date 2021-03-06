import React,{useEffect,useState,useRef} from 'react'
import MapPanel from './MapPanel';
import CustomerTable from "./CustomerTable";
import DealersTable from "./DealersTable";
import axios from 'axios';
import Button from '@material-ui/core/Button';

import { CurrentPageComponent } from './CurrentPageComponent';
import { set } from 'lodash';

export const AdminCurrentPageComponent = ({
    currentPageNumber,
    user,
    changePage
}) => {
    const [dealers, setDealers] = useState([]);
    const currentDealer = useRef({isView:false});
    useEffect(() => {
        axios.get("http://localhost:8000/api/users/dealers/",{withCredentials:true})
            .then(response=>{
                console.log(response.data)
                setDealers(response.data);
            })
            .catch(err=>console.log(err))
    }, [])

    const updateDealer=async(updateDealer,email=false,username=false)=>{
        const check=!email?delete updateDealer['email']:username?delete updateDealer['username']:false
        const errorArr = [];
        let success=false
        await axios.put("http://localhost:8000/api/users/update/"+updateDealer._id,updateDealer,{withCredentials:true})
        .then(response=>{
                success=true;
                setDealers(dealers.map((dealer)=>dealer._id===updateDealer._id?response.data:dealer));
                currentDealer.current={isView:false}
            })
        .catch(err=>{ 
            console.log(updateDealer);
            console.log(err);
        try{
            console.log(err.response.data.errors)
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

    const deleteDealer=(dealerToDelete)=>{
        console.log(dealerToDelete)
        axios.delete("http://localhost:8000/api/users/delete/"+dealerToDelete._id,{withCredentials:true})
        .then(response=>{
                setDealers(dealers.filter((dealer)=>dealer._id!==dealerToDelete._id));
        })
        .catch(err=>console.log(err))

    }
    const createDealer=async(newDealer)=>{
        console.log(newDealer)
            const errorArr = [];
            let success=false
            await axios.post("http://localhost:8000/api/users/create/",newDealer,{withCredentials:true})
                .then((response) => {setDealers([...dealers,response.data]);success=true})
                .catch(err =>{
                    try{
                        console.log(err)
                        console.log(err.response.data.errors)
                        const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                        for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                            errorArr.push(errorResponse[key].message)
                        }    
                    }catch(e){
                        console.log(e);
                    }
                })
            return {errors:errorArr,success:success};
        
    
        // setFavBooks([...favBooks,book]);


    }
    return currentPageNumber===0&&dealers.length>0?<MapPanel editMember={currentDealer.current} viewMember={(dealer)=>{currentDealer.current=dealer; changePage(5);}} updateMember={updateDealer}  viewDealer={true} createMember={createDealer} deleteMember={deleteDealer} updateMember={updateDealer} members={dealers} user={user}/>
    :currentPageNumber===1?<div><DealersTable deleteMember={deleteDealer} viewMember={(dealer)=>{currentDealer.current={isView:true,...dealer}; changePage(0);}} dealers={dealers} /></div>
    :currentPageNumber===5? 
    <div><Button style={{float:'right'}} onClick={e=>{ changePage(0); }} variant="contained" color="primary">Back</Button>
        <CurrentPageComponent updateDealers={(data)=>setDealers(dealers.map((dealer)=>dealer._id===data._id?data:dealer))}
         isAdmin={user.Role.isAdmin} currentPageNumber={0} user={currentDealer.current}  /></div>
    :''
}

