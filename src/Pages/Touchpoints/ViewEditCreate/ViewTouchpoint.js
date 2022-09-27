import {useEffect, useState} from 'react';
import { arrayOfTemplates, view, duplicate } from '../TPLibrary/TouchpointTable';
import R10Form from './Forms/R10-Form';
import R5Form from './Forms/R5-Form';
import MCIForm from './Forms/MCI-Form';
import MCForm from './Forms/MC-Form';
import FFForm from './Forms/FF-Form';
import {db} from '../../Firebase';
import {set, ref, remove, onValue} from 'firebase/database';


//Function ran if user is editing an existing touchpoint template. Depending on template type, 
//renders the specific template form file and passes necessary information to populate it.
function ViewTouchpoint(){

      function PushFirebaseTP(touchpointValues){
            set(ref(db, 'TouchpointTemplates/' + touchpointValues.UID), touchpointValues);
      }

      function DeleteFirebaseTP(uid){
            remove(ref(db, 'TouchpointTemplates/' + uid));
      }
    
      const functionWithSwitch = (parameter) => {
            switch(parameter){
                  case "R10":
                        return <R10Form writeToDatabase = {PushFirebaseTP} deleteFromDatabase = {DeleteFirebaseTP} /*writeToDatabaseIDs = {PushFirebaseTpIDs}*/ arrayOfTemplates = {arrayOfTemplates} view = {view} duplicate = {duplicate}/>;
                  case "R5":
                          return <R5Form writeToDatabase = {PushFirebaseTP} deleteFromDatabase = {DeleteFirebaseTP} /*writeToDatabaseIDs = {PushFirebaseTpIDs}*/ arrayOfTemplates = {arrayOfTemplates} view = {view} duplicate = {duplicate}/>;
                  case "FF":
                        return <FFForm writeToDatabase = {PushFirebaseTP} deleteFromDatabase = {DeleteFirebaseTP} /*writeToDatabaseIDs = {PushFirebaseTpIDs}*/ arrayOfTemplates = {arrayOfTemplates} view = {view} duplicate = {duplicate}/>;
                  case "MC":
                        return <MCForm writeToDatabase = {PushFirebaseTP} deleteFromDatabase = {DeleteFirebaseTP} /*writeToDatabaseIDs = {PushFirebaseTpIDs}*/ arrayOfTemplates = {arrayOfTemplates} view = {view} duplicate = {duplicate}/>;
                  case "MCI":
                        return <MCIForm writeToDatabase = {PushFirebaseTP} deleteFromDatabase = {DeleteFirebaseTP} /*writeToDatabaseIDs = {PushFirebaseTpIDs}*/ arrayOfTemplates = {arrayOfTemplates} view = {view} duplicate = {duplicate}/>;
                  default:
                        break;
             }
      }
      return(
            <div>
                  {functionWithSwitch(arrayOfTemplates.Type)}
            </div>
      );
      

} export default ViewTouchpoint;