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

const DealerForm = ({
                          changeComponent,
                          onSubmitProp,
                          requestLocation,
                          locationResponse,
                          title,
                          dealer,
                          isEdit
                      }) => {
    const classes = useStyles();

    const [firstName, setFirstName] = useState(dealer.firstName);
    const [lastName, setLastName] = useState(dealer.lastName);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState(dealer.email);
    const [username, setUsername] = useState(dealer.username);
    const [phone, setPhone] = useState(dealer.phone);
    const [location, setLocation] = useState(dealer.location);
    const [region, setRegion] = useState(dealer.region);
    const [errors,setErrors]=useState([]);
    const onSubmit = async e => {
        e.preventDefault()
        let submitAtrr={password,confirmPassword,firstName,lastName,email,username:username,phone,location: {
            lat:location.lat,lng:location.lng,name:region
        }};
        if(isEdit){
            delete submitAtrr['password'];
            delete submitAtrr['confirmPassword'];
            delete submitAtrr['username'];
            delete submitAtrr.email;
            submitAtrr._id=dealer._id

        }
        const res=await onSubmitProp(submitAtrr);
        setErrors(res.errors);
            if(res.success)
            changeComponent(0);
    }
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
                    onChange={(e)=>setUsername(e.target.value)} value ={username}

                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                />

                <TextField
                    onChange={(e)=>setPhone(e.target.value)} value ={phone}

                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                    autoFocus
                />

                <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.formControl}
                >
                    <FormLabel>{"lat: "+location.lat + "    lng: "+location.lng } </FormLabel>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Region"
                        id="region"
                        name="region"
                        onChange={e=>setRegion(e.target.value)}
                        autoComplete="region"
                        autoFocus
                        value={region }
                    />
            {!isEdit&&<Button fullWidth onClick={e=>requestLocation()}  variant="contained" color="secondary">
                Request Location
            </Button>}

                </FormControl>
                {!isEdit?
                <>
                    <TextField
                        onChange={(e)=>setPassword(e.target.value)} value ={password}

                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        autoComplete="password"
                        autoFocus
                    />
                    <TextField
                        onChange={(e)=>setConfirmPassword(e.target.value)} value ={confirmPassword}

                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="ConfirmPassword"
                        label="Confirm Password"
                        name="ConfirmPassword"
                        autoComplete="ConfirmPassword"
                        autoFocus
                    />
                </>:''}







                <Button fullWidth type="submit" variant="contained" color="primary">
                    Submit
                </Button>


            </form>

            {errors.map((err, index) => <p key={index} style={{color:"red"}}>{err}</p>)}

        </div>



    )
}
export default DealerForm;
