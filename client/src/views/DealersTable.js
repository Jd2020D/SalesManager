import React from 'react';
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
import CustomerTable from "./CustomerTable";
import AddNewFriedge from "./AddNewFriedge";

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
    },
    head:{
        marginLeft:'46%',

    }

}));

function createData(name, calories, fat, carbs ,count) {
    return {
        name,
        calories,
        fat,
        carbs,
        count,


        history: [
            { date: '2020-01-05', customerId: '11091700', amount: 3 },
            { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
        ],
    };
}

function Row(props) {
    const { row } = props;
    const {viewMember} =props;
    const {deleteMember} =props;
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
                <TableCell align="center"><a  onClick={e=>e.preventDefault()}>{row.location.name}</a></TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.customers.length}</TableCell>
                <TableCell align="center">
                    <div className={classes.root }>
                        <Button variant="contained" onClick={e=>viewMember()} className={classesNames.but}>Edit</Button>
                        <Button variant="contained" onClick={e=>deleteMember()} className={classesNames.but}>Delete</Button>
                    </div>

                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Customers
                            </Typography>
                            <CustomerTable customers={row.customers}/>
                            {/*<Table size="small" aria-label="purchases">*/}
                            {/*    <TableHead>*/}
                            {/*        <TableRow>*/}
                            {/*            <TableCell>Type</TableCell>*/}
                            {/*            <TableCell>Serial Numbers</TableCell>*/}
                            {/*            <TableCell align="right">Quantity</TableCell>*/}
                            {/*        </TableRow>*/}
                            {/*    </TableHead>*/}
                            {/*    <TableBody>*/}
                            {/*        {row.history.map((historyRow,index) => (*/}
                            {/*            <TableRow key={index}>*/}
                            {/*                <TableCell component="th" scope="row">*/}
                            {/*                    {historyRow.date}*/}
                            {/*                </TableCell>*/}
                            {/*                <TableCell>{historyRow.customerId}</TableCell>*/}
                            {/*                <TableCell align="right">{historyRow.amount}</TableCell>*/}
                            {/*            </TableRow>*/}
                            {/*        ))}*/}
                            {/*    </TableBody>*/}
                            {/*</Table>*/}
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

export default function DealersTable({
    dealers,
    viewMember,
    deleteMember
}) {
    
const classes =useStyles();
    return (
        <TableContainer component={Paper}>
            <Typography className={classes.head} variant="h4" gutterBottom component="div">
                Dealers
            </Typography>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Region Name</TableCell>
                        <TableCell align="center">Phone</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Customers</TableCell>
                        <TableCell align="center" >Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dealers.map((dealer,index) => (
                        <Row key={index} row={dealer} deleteMember={()=>deleteMember(dealer)} viewMember={()=>{ console.log(dealer); viewMember(dealer);}}/>

                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
// className={classes.root}
// <Button variant="contained">Edit</Button>
// <Button variant="contained">Delete</Button>