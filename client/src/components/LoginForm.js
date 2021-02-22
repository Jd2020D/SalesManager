import React,{ useState,useEffect } from "react"
import LockIcon from '@material-ui/icons/Lock';
import Typography from "@material-ui/core/Typography";
import {Container, CssBaseline, makeStyles, Paper, TextField, Zoom} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    err:{
        color:'red',
        fontSize:'15px',
        marginBottom:'2px'
    }

}));
const LoginForm = props => {
    const classes = useStyles();
    const { onSubmitProp } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors,setErrors]=useState([]);
    const onSubmit = async e => {
        console.log((1));
        e.preventDefault()
        const res= await onSubmitProp({email,password});
        console.log((res))
        setErrors(res.errors);
        // if(res.errors.length<=0)
        //     res.source.cancel();

    }

    useEffect(() => {
        
        return () => {
            
        }
    }, [])
    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={ onSubmit }>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e)=>setEmail(e.target.value)} value ={email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e)=>setPassword(e.target.value)} value ={password}
                    />
                    {errors.length>0&&<Zoom in={true} style={{ transitionDelay: '50ms'}}>
                            <Paper elevation={4} className={classes.paper}>
                                {errors.map((err, index) => {
                                    return <small key={index} className={classes.err}>{err}</small>
                                })}
                            </Paper>
                        </Zoom>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>

                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
    }
export default LoginForm;

