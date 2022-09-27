import {React, useState, useEffect} from 'react';
import MediaList from './MediaList';
import {ref, onValue} from "firebase/database";
import {db} from '../Firebase';

//First function inside Media subpage. Gets video information from realtime database to populate a future data table. 
//Then renders <MediaList /> passing the information.
function MediaLibrary(){
      const [isLoading, setIsLoading] = useState(true);
      const [loadedVideos, setLoadedVideos] = useState([]);

      useEffect(() => {
            onValue(ref(db, '/Videos' ), snapshot => {
                  
                  const data = snapshot.val();
                  if(data !== null){
                        setLoadedVideos(data);
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
                  <div>
                    <MediaList loadedVideos={loadedVideos}/>
                    </div>
            </section>
      )

} export default MediaLibrary;