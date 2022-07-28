import _ from 'lodash';
import {React, useState, useEffect} from 'react';
import TouchpointList from './TouchpointList';
import {ref, onValue} from "firebase/database";
import {db} from '../../Firebase';

function TouchpointLibrary(){

    const [isLoading, setIsLoading] = useState(true);
    const [loadedTouchpointTemplates, setLoadedTouchpointTemplates] = useState({});

    useEffect(() => {
        onValue(ref(db, '/TouchpointTemplates' ), snapshot => {;
            setLoadedTouchpointTemplates([]);
            const data = snapshot.val();
            //console.log(data);
            if(data !== null){
                setLoadedTouchpointTemplates(data);
                setIsLoading(false);
           
            };
        });
    }, []);

    if (isLoading) {
        return (
            <section>
                <p>
                    Loading...
                </p>
            </section>
        );
    }

    return (
        <section>
                <TouchpointList touchpointTemplates={loadedTouchpointTemplates}/>
        </section>
    )
}
export default TouchpointLibrary;