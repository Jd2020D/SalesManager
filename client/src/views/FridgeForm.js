import React from 'react'
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import TableRow from "@material-ui/core/TableRow";

const FridgeForm = (
    classes,
       classesNames,
    quantitiy,
        type,
    serialNumber,
         setEditing
) => {

    return (
        <TableRow >
            <TableCell component="th" scope="row">
                <input value={type}/>
            </TableCell>
            <TableCell><input value={serialNumber}/></TableCell>
            <TableCell align="center"><input value={quantitiy}/></TableCell>
            <TableCell align="center">
                <div className={classes.root}>
                    <Button variant="contained" className={classesNames.but} onClick={(e)=>setEditing()}>Cancel</Button>
                    <Button variant="contained" className={classesNames.but} >Delete</Button>
                </div>
            </TableCell>
        </TableRow>
    )
}

export default FridgeForm
