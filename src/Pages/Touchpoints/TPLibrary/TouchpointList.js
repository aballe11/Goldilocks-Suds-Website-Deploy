import _ from 'lodash';
import {React} from 'react';
import TouchpointTable from './TouchpointTable';

//Function ran to handle data, creating a new array specific for the data table.
function TouchpointList(props){
      var arrayOfTemplates = props.touchpointTemplates;
      var templateTableEnabledArray = [];
      for(let v in arrayOfTemplates){ 
            const ID = v;
            const Alias =  _.get(arrayOfTemplates[v], ['Alias']);
            const Prompt = _.get(arrayOfTemplates[v], ['Prompt']);
            const TimesUsed = _.get(arrayOfTemplates[v], ['TimesUsed']);
            var Type = _.get(arrayOfTemplates[v], ['Type']);
            switch(Type){
                  case 'R10': Type = '10-Point Rating'; 
                      break;
                  case 'R5': Type = '5-Point Rating';
                      break;
                  case 'MCI': Type = 'Multiple Choice w/ Images';
                      break;
                  case 'MC': Type = 'Multiple Choice'
                      break;
                  case 'FF': Type = 'Freeform Input'
                      break; 
            }
            
            templateTableEnabledArray.push({
                  'id': ID,
                  'Alias': Alias,
                  'Times Used': TimesUsed,
                  'Question Prompt': Prompt,
                  'Type': Type,
                  'btn': '',
            })
            
      }

      return(
            <TouchpointTable arrayOfTemplates = {arrayOfTemplates} templateTableEnabledArray={templateTableEnabledArray}/>
      );
}
export default TouchpointList;