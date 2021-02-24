import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Delete from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import ExploreIcon from '@material-ui/icons/Explore';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import AddIcon from '@material-ui/icons/Add';
import Slider from '@material-ui/core/Slider';
import {withStyles} from "@material-ui/core";
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
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

];
const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        width:'60%',
        height: 8,
        marginLeft:'20px'
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        color:"black",
        marginLeft:'20px'
    },
    button: {
        margin: theme.spacing(1),

    },
    scroll:{
        overflow: 'scroll',
        width:'100%',
        height:'500px'

    },
    add:{
        marginLeft:'138px'
    }

}));

const DetailsSidePanel = ({
    customers,
    zoomScale,
    zoomHandler,
    currentCustomer,
    deleteCustomer,
    activeMarkerPin,
    toggleCustomer,
    currentCustomerPanel,
    changeComponent,
    viewDealer,
    editMember,
    viewMember
    }) => {
    const classes= useStyles();
    return (
        <>
            <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" value={zoomScale}  max="18" onChange={(e,val)=>zoomHandler(val)} />
            <br/>
            <Button
            variant="contained"
            color="default"
            className={classes.add}
            startIcon={<AddIcon />}
            onClick={e=>changeComponent(1)}
        >ADD</Button>
        <div className={classes.scroll} >

        {

            customers.map((customer,index)=>{
                return <Card className={classes.root} onClick={e=>{if(e.target.className==='MuiCardContent-root')toggleCustomer(customer);}} ref={currentCustomer._id===customer._id?currentCustomerPanel:null}  key={index}>
                            <CardActionArea variant="flush"   style={ currentCustomer._id===customer._id?{background:'#fbc15c'}:{background:'#2179c3'}} > {/*view*/}
                            <CardContent  style={ currentCustomer._id===customer._id
                                ? {background: '#fbc15c'}
                            :{background:'#2179c3'}}>
                                <Typography gutterBottom variant="h5" component="h2" >
                                    {customer.firstName} {customer.lastName}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="default"
                                    className={classes.button}
                                    startIcon={<Delete />}
                                    onClick={e=>deleteCustomer(customer)}
                                >
                                    Delete
                                </Button>

                                    <Button
                                        variant="contained"
                                        color="default"
                                        className={classes.button}
                                        startIcon={<EditIcon />}
                                        onClick={e=>{editMember(customer); changeComponent(2);}}
                                    >
                                        Edit 
                                    </Button>
                                {viewDealer&&<Button
                                    onClick={e=>{viewMember(customer);}}
                                    variant="contained"
                                    color="default"
                                    className={classes.button}
                                    startIcon={<PersonPinCircleIcon />}
                                >
                                    View Customers
                                </Button>}

                                <Button
                                    onClick={e=>{toggleCustomer(customer,false,true);}}
                                    variant="contained"
                                    color="default"
                                    className={classes.button}
                                    startIcon={<VisibilityIcon />}
                                >
                                    View Location
                                </Button>
                                {currentCustomer._id===customer._id&&activeMarkerPin
                                    ?<Button  onClick={e=>toggleCustomer({_id:false,activeMarkerPin:false})}
                                              variant="contained"
                                              color="default"
                                              className={classes.button}
                                              startIcon={<CancelIcon />}
                                    >Cancel</Button>
                                    :<Button  onClick={e=>toggleCustomer(customer,true)}
                                              variant="contained"
                                              color="default"
                                              className={classes.button}
                                              startIcon={viewDealer?<ZoomOutMapIcon/>:<ExploreIcon />}
                                    >Update {viewDealer?"Region":"Location"} </Button>}

                            </CardContent>
                            {/* <button onClick={e=>setCustomers(customers.filter((customers,index)=>item.lat!==marker.lat&&item.lng!==marker.lng))}>Delete location</button> */}
                        </CardActionArea>
                        <CardActions>

                        </CardActions>
                        {/*{currentCustomer._id==customer._id&&activeMarkerPin?<button onClick={e=>toggleCustomer({_id:false})}>cancel</button>:<button onClick={e=>toggleCustomer(customer,true)}>change</button>}*/}
                        {/*<button onClick={e=>deleteCustomer(customer)}>Delete</button>*/}
                </Card>
            })

        }
            </div>
        </>
    )
}

export default DetailsSidePanel;
// <Card className={classes.root}>
//     <CardActionArea>
//         <CardMedia
//             component="img"
//             alt="Contemplative Reptile"
//             height="140"
//             image="/static/images/cards/contemplative-reptile.jpg"
//             title="Contemplative Reptile"
//         />
//         <CardContent>
//             <Typography gutterBottom variant="h5" component="h2">
//                 Lizard
//             </Typography>
//             <Typography variant="body2" color="textSecondary" component="p">
//                 Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
//                 across all continents except Antarctica
//             </Typography>
//         </CardContent>
//     </CardActionArea>
//     <CardActions>
//         <Button size="small" color="primary">
//             Share
//         </Button>
//         <Button size="small" color="primary">
//             Learn More
//         </Button>
//     </CardActions>
// </Card>
