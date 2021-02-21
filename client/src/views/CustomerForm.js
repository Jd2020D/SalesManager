import React, { useState,useEffect } from "react"
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

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh"
    },
    paper: {
        margin: theme.spacing(3, 4),
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

const CustomerForm = ({
    changeComponent,
    onSubmitProp,
    requestLocation,
    locationResponse,
    title
}) => {
    const classes = useStyles();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState({});
    const [firdge, setFridge] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [errors,setErrors]=useState([]);
    const onSubmit = async e => {
        e.preventDefault()
        const res=await onSubmitProp({firstName,lastName,email,phone,location,firdge,quantity});
        setErrors(res.errors);
        // if(res.errors.length<=0)
        //     res.source.cancel();

    }
    useEffect(() => {
        return () => {
        }
    }, [])
    useEffect(() => {
        if(locationResponse.lat)
            setLocation(locationResponse);
    }, [locationResponse])
    return(


        <div
            className={classes.paper}
            // style={{ maxHeight: 200, overflow: "auto" }}
        >

            <Typography component="h1" variant="h5">
                {title}
            </Typography>
            <form onSubmit={ onSubmit } className={classes.form} noValidate>
                <TextField
                    onChange={(e)=>setFirstName(e.target.value)} value ={firstName}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First name"
                    name="firstName"
                    autoComplete="text"
                    autoFocus
                />

                <TextField
                    onChange={(e)=>setLastName(e.target.value)} value ={lastName}

                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last name"
                    name="lastName"
                    autoComplete="text"
                    autoFocus
                />

                <TextField
                    onChange={(e)=>setEmail(e.target.value)} value ={email}

                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />

                <TextField
                    onChange={(e)=>setPhone(e.target.value)} value ={phone}

                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    autoFocus
                />

                <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.formControl}
                >
                    <FormLabel>Location:</FormLabel>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="location"
                        name="location"
                        autoComplete="phoneNumber"
                        autoFocus
                        inputProps={{ readOnly: true }}
                        value={"lat: "+location.lat + "    lng: "+location.lng }
                    />
                </FormControl>
                <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.formControl}
                >
                    <InputLabel htmlFor="outlined-age-native-simple">
                        Fridge
                    </InputLabel>
                    <Select
                        onChange={(e)=>setFridge(e.target.value)} value ={firdge}
                        native
                        value={""}
                        onChange={""}
                        label="Age"
                        inputProps={{
                            name: "age",
                            id: "outlined-age-native-simple"
                        }}
                    >
                        <option aria-label="None" value="" />
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                    </Select>
                </FormControl>

                <TextField
                    onChange={(e)=>setQuantity(e.target.value)} value ={quantity}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="quantity"
                    label="Quantity"
                    name="quantity"
                    autoFocus
                />


                <Button fullWidth type="submit" variant="contained" color="primary">
                    Submit
                </Button>


            </form>
            <Button fullWidth onClick={e=>requestLocation()}  variant="contained" color="secondary">
                Request Location
            </Button>

            {errors.map((err, index) => <p key={index} style={{color:"red"}}>{err}</p>)}

        </div>



    )
}
export default CustomerForm;
