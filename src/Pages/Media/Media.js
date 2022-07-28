import React from 'react';

function Media(){

    const current = new Date();
    const date = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`;


    return (
        <div>
            {/*<h1>Date is: {date}</h1>*/}
            <h1>Under construction...</h1>
        </div>
    );
}
export default Media;