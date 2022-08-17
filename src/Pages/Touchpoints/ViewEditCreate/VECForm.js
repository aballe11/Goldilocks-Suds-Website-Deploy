import { useRef } from 'react';
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
import {set, ref, remove} from 'firebase/database';
import _ from 'lodash';


function VECForm(props){
 
    const [dropdown, setDropdown] = useState(false);
    const openCloseDropdown=()=>{
        setDropdown(!dropdown);
    }

    const [type, setType]  = useState('');
    const handleType=(e)=>{
        setType(e);
    }

    function PushFirebaseTP(touchpointValues){
        console.log(touchpointValues.uid);
        set(ref(db, 'TouchpointTemplates/' + touchpointValues.uid), touchpointValues);
    }

    function DeleteFirebaseTP(uid){
        remove(ref(db, 'TouchpointTemplates/' + uid));
  }

    const functionWithSwitch = (parameter) => {
        switch(parameter){
            case "R10":
                return <R10Form writeToDatabase = {PushFirebaseTP} deleteFromDatabase = {DeleteFirebaseTP} />;
            case "R5":
                return <R5Form writeToDatabase = {PushFirebaseTP} deleteFromDatabase = {DeleteFirebaseTP} />;
            case "FF":
                return <FFForm writeToDatabase = {PushFirebaseTP} deleteFromDatabase = {DeleteFirebaseTP} />;
            case "MC":
                return <MCForm writeToDatabase = {PushFirebaseTP} deleteFromDatabase = {DeleteFirebaseTP} />;
            case "MCI":
                return <MCIForm writeToDatabase = {PushFirebaseTP} deleteFromDatabase = {DeleteFirebaseTP} />;
            default:
                break;
        }
    }

    return (
        <div>
            <h1 className={classes.h1}>Create New Touchpoint</h1>
            <br/>
            <Dropdown isOpen={dropdown} toggle={openCloseDropdown}>
                <DropdownToggle caret className={classes.dropdownBtn}>
                    'Touchpoint Type
                </DropdownToggle>

                <DropdownMenu>
                    <DropdownItem header>Select...</DropdownItem>
                    <DropdownItem divider/>

                    <DropdownItem  onClick={()=>handleType("R10")}  >10-Based Rating</DropdownItem>
                    <DropdownItem  onClick={()=>handleType("R5")}   >5-Based Rating</DropdownItem>
                    <DropdownItem  onClick={()=>handleType("FF")}   >Freeform Input</DropdownItem>
                    <DropdownItem  onClick={()=>handleType("MC")}   >Multiple Choice</DropdownItem>
                    <DropdownItem  onClick={()=>handleType("MCI")}  >Multiple Choice w/ Images</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <br></br>
            {functionWithSwitch(type)}
        </div>
    ); 
}

export default VECForm;