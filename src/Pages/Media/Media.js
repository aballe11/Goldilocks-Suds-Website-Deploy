import React from 'react';
import MediaLibrary from './MediaLibrary';

function Media(){

    const current = new Date();
    const date = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`;


    return (
        <div>
            <MediaLibrary/> 
        </div>
    );
}
export default Media;