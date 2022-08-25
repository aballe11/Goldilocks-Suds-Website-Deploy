import React, {useState} from 'react';

function ExistingTouchpoint(props){
      const [time, setTime] = useState(props.second);
      const id = props.id;
      const array = props.idTemplate;
      const count = props.count;

      console.log('Inside!');

      return(
            <div>
                  <label>{count}: {time} - {id}</label>
            </div>
      );
}export default ExistingTouchpoint;