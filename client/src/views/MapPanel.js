import React,{useState,useRef} from 'react'
import MyMap from './MyMap';

import CustomersMarkers from './CustomersMarkers';
import SidePanels from './SidePanels';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";


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
const useStyles = makeStyles((theme) => ({
    root: {

        height: "100vh"
    },
    image: {
        backgroundImage: "url(https://source.unsplash.com/random)",
        backgroundRepeat: "no-repeat",
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center"
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));



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
const MapPanel = ({
    members:customers,
    updateMember,
    viewDealer,
    deleteMember,
    createMember,
    viewMember,
    editMember,
    initialView
}) => {
    const classes = useStyles();

    const [currentCustomer,setCurrentCustomer]=useState({_id:false,activeMarkerPin:false});
    const [locationToAdd,setLocationToAdd]=useState({});
    const [zoomScale,setZoomScale]=useState(initialView?12:9);
    const currentCustomerPanel=useRef();
    const zoomHandler=(scale)=>{
        setZoomScale(prev=>{
            return scale<0||scale>18?prev:scale;
        })
    }
    const updateCurrentCustomerLocation =(newMapLocation)=>{
        setCurrentCustomer({...currentCustomer,location:{...newMapLocation},activeMarkerPin:false});
        updateMember({...currentCustomer,location:{...newMapLocation}})
        // setCustomers(customers=>{
        //     activeMarkerPin.current=false;
        //     return customers.map((customer,index)=>{
        //         const locKey=viewDealer?"region":"location";
        //         return currentCustomer._id===customer._id?{...customer,locKey:{...newMapLocation}}:customer
        //     })
    
        // }
        
        // );
    }
    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }
    const  requestLocation=async(clear=false)=>{
        clear?setLocationToAdd({})
        :setLocationToAdd({req:true})

    }
    const deleteCustomer=(customer)=>{
        deleteMember(customer);
        

    }
    const toggleCustomer=(customer,change=false,view=false)=>{
        //change being true if the customer toggled by button
        setCurrentCustomer(prevCustomer=>{
            if(!view&&!change&&prevCustomer._id===customer._id)
                return {_id:false,activeMarkerPin:false};
            console.log(view)
            return {_id:customer._id,location:customer.location,activeMarkerPin:change};
        })
        // we dont want to focus on the customer panel if it toggled by button
        if(currentCustomerPanel.current&&!change)
            currentCustomerPanel.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

    }
    const sharedProps1= {
        toggleCustomer,
        zoomScale,
        currentCustomer,
        customers,
        viewDealer
    }
    // console.log(currentComponent);
    return (
        <Grid container spacing={3}>
            <Grid item xs={8}>
                <MyMap initialView={initialView}
                marker={<CustomersMarkers
                    {...sharedProps1}
                    activeMarkerPin={currentCustomer.activeMarkerPin}
                    updateCurrentCustomerLocation={updateCurrentCustomerLocation}
                    locationRequest={locationToAdd}
                    locationResponse={(location)=>setLocationToAdd(location)}
                />} />
            </Grid>
            <Grid item xs={4}>


                <SidePanels
                    sharedProps1={sharedProps1}
                    zoomHandler={zoomHandler}
                    activeMarkerPin={currentCustomer.activeMarkerPin}
                    currentCustomerPanel={currentCustomerPanel}
                    deleteCustomer={deleteCustomer}
                    requestLocation={requestLocation}
                    locationResponse={locationToAdd}
                    createMember={createMember}
                    updateMember={updateMember}
                    viewMember={viewMember}
                    editMember={editMember}
                />
            </Grid>


        </Grid>
    )
}

export default MapPanel
