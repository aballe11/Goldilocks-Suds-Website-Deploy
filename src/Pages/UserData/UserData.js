import FeedbackList from './FeedbackList';
import {ref, onValue} from "firebase/database";
import { useState, useEffect } from 'react';
import {db} from '../Firebase';

//Starter function for User Data subpages. //Prepares for and calls <FeedbackList/>
function UserData() {
    const [isLoading, setIsLoading] = useState(true);
    const [IDs, setIDs] = useState('');
    const [loadedFeedbackCards, setLoadedFeedbackCards] = useState({});

    //Gets string of available Video IDs from the realtime database.
    useEffect(()=> {
        onValue(ref(db, '/VideoIDs'), (snapshot) => {
            setIDs('');
            const UIDs = snapshot.val();
            //console.log(UIDs);
            if(UIDs !== null){
                setIDs(UIDs);
            }

        });
    }, []);
    
    //Gets json data of /Feedback in the realtime database.
    useEffect(() => {
        onValue(ref(db, '/Feedback' ), snapshot => {;
            setLoadedFeedbackCards([]);
            const data = snapshot.val();
            //console.log(data);
            if(data !== null){
                setLoadedFeedbackCards(data);
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
                <FeedbackList videosFeedack={loadedFeedbackCards} IDs = {IDs}/>
        </section>
    );
}

export default UserData;