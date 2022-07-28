import { arrayOfTemplates } from '../TPLibrary/TouchpointTable';
import R10Form from './Forms/R10-Form';
import R5Form from './Forms/R5-Form';
import MCIForm from './Forms/MCI-Form';
import MCForm from './Forms/MC-Form';
import FFForm from './Forms/FF-Form';
import {db} from '../../Firebase';
import {set, ref} from 'firebase/database';
import _ from 'lodash';

function ViewTouchpoint(){
      function PushFirebaseTP(touchpointValues){
            var id = touchpointValues.Alias.split(' ');
            id = _.join(id, '-');
            //console.log(id)
            set(ref(db, 'TouchpointTemplates/' + id), touchpointValues);
      }
    
      const functionWithSwitch = (parameter) => {
            switch(parameter){
                  case "R10":
                        return <R10Form writeToDatabase = {PushFirebaseTP} arrayOfTemplates = {arrayOfTemplates}/>;
                  case "R5":
                          return <R5Form writeToDatabase = {PushFirebaseTP} arrayOfTemplates = {arrayOfTemplates}/>;
                  case "FF":
                        return <FFForm writeToDatabase = {PushFirebaseTP} arrayOfTemplates = {arrayOfTemplates}/>;
                  case "MC":
                        return <MCForm writeToDatabase = {PushFirebaseTP} arrayOfTemplates = {arrayOfTemplates}/>;
                  case "MCI":
                        return <MCIForm writeToDatabase = {PushFirebaseTP} arrayOfTemplates = {arrayOfTemplates}/>;
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