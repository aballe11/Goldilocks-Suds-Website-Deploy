import { useEffect } from 'react';
import classes from './VECForm.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import {useState} from 'react';
import R10Form from './Forms/R10-Form';
import R5Form from './Forms/R5-Form';
import MCIForm from './Forms/MCI-Form';
import MCForm from './Forms/MC-Form';
import FFForm from './Forms/FF-Form';
import {db} from '../../Firebase';
import {set, ref, remove, onValue} from 'firebase/database';
import _ from 'lodash';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

//Function ran if user is creating a new touchpoint template. Handles dropdown buttons to
//select type of new touchpoint template being created, and runs the specific form file.
//No preexisting information is being passed.
function VECForm(props){ 
    const [dropdownValue, setDropdownValue] = useState('');
    const [dropdown, setDropdown] = useState(false);
    const openCloseDropdown=()=>{
        setDropdown(!dropdown);
    }

    const [type, setType]  = useState('');
    const handleType=(e)=>{
        setType(e);
    }

    function PushFirebaseTP(touchpointValues){
        set(ref(db, 'TouchpointTemplates/' + touchpointValues.UID), touchpointValues);
    }

    function DeleteFirebaseTP(uid){
        remove(ref(db, 'TouchpointTemplates/' + uid));
    }

    /*function PushFirebaseTpIDs(StringIDs) {
        set(ref(db, 'TouchpointTemplatesIDs/'), StringIDs);
    }*/

    const functionWithSwitch = (type) => {
        switch(type){
            case "10-Point Rating":
                return <R10Form writeToDatabase = {PushFirebaseTP} /*writeToDatabaseIDs = {PushFirebaseTpIDs}*/ deleteFromDatabase = {DeleteFirebaseTP} />;
            case "5-Point Rating":
                return <R5Form writeToDatabase = {PushFirebaseTP} /*writeToDatabaseIDs = {PushFirebaseTpIDs}*/ deleteFromDatabase = {DeleteFirebaseTP} />;
            case "Freeform Input":
                return <FFForm writeToDatabase = {PushFirebaseTP} /*writeToDatabaseIDs = {PushFirebaseTpIDs}*/ deleteFromDatabase = {DeleteFirebaseTP} />;
            case "Multiple Choice":
                return <MCForm writeToDatabase = {PushFirebaseTP} /*writeToDatabaseIDs = {PushFirebaseTpIDs}*/ deleteFromDatabase = {DeleteFirebaseTP} />;
            case "Multiple Choice w/ Images":
                return <MCIForm writeToDatabase = {PushFirebaseTP} /*writeToDatabaseIDs = {PushFirebaseTpIDs}*/ deleteFromDatabase = {DeleteFirebaseTP} />;
            default:
                break;
        }
    }

    const optionsArray = [{label:"10-Point Rating"}, {label:"5-Point Rating"}, {label:"Freeform Input"}, {label:"Multiple Choice"}, {label:"Multiple Choice w/ Images"}]

    const handleDropdownChange = (event, newDropdownValue) => {
        console.log(newDropdownValue);
        setDropdownValue(newDropdownValue.label);
        handleType(newDropdownValue.label)
    }

    return (
        <div>
            <h1 className={classes.h1}>Create New Touchpoint</h1>
            <br/>
            <Autocomplete 
                value={dropdownValue}
                onChange={(event, newDropdownValue) => {handleDropdownChange(event, newDropdownValue)}}
                disablePortal 
                options={optionsArray}
                id="templates-combo-box" 
                sx={{ width: 300 }} 
                renderInput={(params) => <TextField {...params} 
                label="Select touchpoint type..." />}/>
            <br/>
            {functionWithSwitch(type)}
        </div>
    ); 
}

export default VECForm;