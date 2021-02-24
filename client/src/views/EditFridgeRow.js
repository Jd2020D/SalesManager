import React, {useState} from 'react'
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import TableRow from "@material-ui/core/TableRow";
import FridgeForm from "./FridgeForm";


const EditFridgeRow = ({
    type,
    serialNumber,
    quantitiy,
    fridgeId,
   classesNames,
   classes,
                           historyRow
                       }) => {

    const [isEditing,setEditing]=useState(true);


    return isEditing?<TableRow  >
            <TableCell component="th" scope="row">
                {historyRow.date}
            </TableCell>
            <TableCell>{historyRow.customerId}</TableCell>
            <TableCell align="center">{historyRow.amount}</TableCell>
            <TableCell align="center">
                <div className={classes.root}>
                    <Button variant="contained" className={classesNames.but} onClick={(e)=>setEditing(!isEditing)}>Edit</Button>
                    <Button variant="contained" className={classesNames.but} >Delete</Button>
                </div>
            </TableCell>
        </TableRow>

        :<TableRow >
            <TableCell component="th" scope="row">
                <input value={type}/>
            </TableCell>
            <TableCell><input value={serialNumber}/></TableCell>
            <TableCell align="center"><input value={quantitiy}/></TableCell>
            <TableCell align="center">
                <div className={classes.root}>
                    <Button variant="contained" className={classesNames.but} onClick={(e)=>setEditing(!isEditing)}>Cancel</Button>
                    <Button variant="contained" className={classesNames.but} >Delete</Button>
                </div>
            </TableCell>
        </TableRow>
    // <FridgeForm
    //     classes={classes}
    //     classesName={classesNames}
    //     quantity={quantitiy}
    //     type={type}
    //     serial={serialNumber}
    //     setEditing={setEditing}
    // />
}

export default EditFridgeRow
