import React, {useState} from 'react';

function ExistingTouchpoint(props){
      const [time, setTime] = useState(props.second);
      const id = props.id;
      const array = props.idTemplate;
      const count = props.count;
      
      return(
            <div>
                  <label>{count}: {time} - {id}</label>
            </div>
      );
}export default ExistingTouchpoint;