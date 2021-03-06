import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button';
import AddNewFriedge from "./AddNewFriedge";
import EditFridgeRow from "./EditFridgeRow";


const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    but:{
        margin:'10px',
    }

}));

function createData(name, calories, fat, carbs) {
    return {
        name,
        calories,
        fat,
        carbs,


        history: [
            { date: '2020-01-05', customerId: '11091700', amount: 3 },
            { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
        ],
    };
}




// function renderActionSection(){
//     if (isEditing===true){
//         return(
//             <span className="icons spanItem">
//           <Button className="btnCancel" onClick={(e)=>onCancelClick} >Cancel</Button>
//           <Button className="btnSave" >Save</Button>
//       </span>
//         );
//     }
// }

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const classesNames =useStyles();
    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                {row.firstName} {row.lastName}
                </TableCell>
                <TableCell/>
                <TableCell align="center"><a onClick={e=>e.preventDefault()}>{row.phone}</a></TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.fridges.length}</TableCell>
                <TableCell align="center">
                    <div className={classes.root }>
                        <Button variant="contained" className={classesNames.but}>Edit</Button>
                        <Button variant="contained" className={classesNames.but}>Delete</Button>
                    </div>

                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Fridges
                            </Typography>
                             {/* <AddNewFriedge/> */}
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Serial Numbers</TableCell>
                                        <TableCell align="center">Quantity</TableCell>
                                        <TableCell align="center">
                                           Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.fridges.map((fridge,index) => (

                                            <EditFridgeRow key={index}
                                                           classes={classes}
                                                           classesNames={classesNames}
                                                           fridge={fridge}
                                            />


                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,


    }).isRequired,
};

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24),
    createData('Ice cream sandwich', 237, 9.0, 37),
    createData('Eclair', 262, 16.0, 24 ),
    createData('Cupcake', 305, 3.7, 67),
    createData('Gingerbread', 356, 16.0, 49),
];

export default function CustomerTable({
    customers
}) {

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Name</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">Phone</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center" >Fridges</TableCell>
                        <TableCell align="center" >Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customers.map((customer,index) => (
                        <Row key={index}  row={customer}/>

                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
// className={classes.root}
// <Button variant="contained">Edit</Button>
// <Button variant="contained">Delete</Button>