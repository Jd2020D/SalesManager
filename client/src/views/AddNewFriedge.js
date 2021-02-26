import React, { Component } from 'react';
import _ from 'lodash';
import Button from "@material-ui/core/Button";
import {InputLabel, MenuItem, Select, TableCell} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import {makeStyles} from "@material-ui/core/styles";
import {spacing, style} from "@material-ui/system";

import FormControl from "@material-ui/core/FormControl";
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    but:{
        margin:'10px',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },

}));

export default class AddNewFriedge extends Component {

    constructor(props){
        super(props);

        this.state={
            error:null,

        }
    }

    render() {
        return (

                <form >
                    <TableRow>
                   < TableCell>
                       <FormControl >
                       <InputLabel id="Types">Type</InputLabel>
                       <Select id="Types" style={{width: '200px',height:'40px',fontSize:'20px'}} type="text" labelId={"Select Type"} ref="nameInput">
                       <MenuItem value={"L"}>L</MenuItem>
                       <MenuItem value={"M"}>M</MenuItem>
                       <MenuItem value={"S"}>S</MenuItem>
                   </Select>
                       </FormControl>
                   </TableCell>
                        {/*<TableCell> <input  style={{width: '200px',height:'40px',fontSize:'20px'}} type="number"  placeholder="Serial Number"ref="emailInput"/></TableCell>*/}
                            <TableCell><input  style={{width: '200px',height:'40px',fontSize:'20px'}} type="text" placeholder="Quantity" ref="phoneInput"/></TableCell>
                                <TableCell> <Button variant="contained" className="btnAddNew"type="submit">Add new</Button></TableCell>
                    </TableRow>
                </form>


        );
    }



    handleCreate(event){
        event.preventDefault();

        const input = {name :this.refs.nameInput,
            email:this.refs.emailInput,
            phoneNumber: this.refs.phoneInput};



        this.setState({error:null});
        this.props.addPerson(input.name.value,
            input.email.value,
            input.phoneNumber.value)
        input.name.value='';
        input.email.value='';
        input.phoneNumber.value='';
    }



}