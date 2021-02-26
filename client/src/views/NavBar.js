import React from 'react'
import { makeStyles, Paper, Tab, Tabs, Toolbar} from "@material-ui/core";
import logo from '../img/iceIcon.png'
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import ExploreIcon from '@material-ui/icons/Explore';

     const useStyles = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
   },
   logo:{
    margin:'auto',
     height:'75px'
 },
root: {
         flexGrow: 1,
         maxWidth: '100%',

     },
    large:{
        width:'80px',
        height:'80px'
    }
}));


export const NavBar = ({
    name,
    region,
    isAdmin,
    changePage,
    logout,
    currentPageNumber

}) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Toolbar className={classes.toolbar}>
                {isAdmin&&<h1>Admin</h1>}
                {!isAdmin&&<h1>{name}</h1>}
                <img onClick={(e)=>changePage(0)} alt="logo" className={classes.logo} src={logo}/>
                {!isAdmin&&<h2>{region}</h2>}

            </Toolbar>
            <Paper square className={classes.root}>
                <Tabs
                    value={currentPageNumber}
                    onChange={(e,val)=>changePage(val)}
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="icon label tabs example"
                >
                    <Tab icon={<ExploreIcon/>} onClick={(e)=>changePage(0)} label="Map"/>
                        {isAdmin && <Tab icon={<LocalShippingIcon />} label="Dealers" onClick={(e)=>changePage(1)} />}
                        {!isAdmin&& <Tab icon={<PersonPinIcon/>} label="Customers" onClick={(e)=>changePage(2)}/>}


                        <Tab onClick={e=>logout()} icon={<ExitToAppTwoToneIcon />} label="Logout" />
                </Tabs>
            </Paper>
        </>
    )
}
