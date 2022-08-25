import {React, useState, useEffect} from 'react';
import MediaList from './MediaList';
import {ref, onValue} from "firebase/database";
import {db} from '../Firebase';

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
                    <MediaList loadedVideos={loadedVideos}/>
            </section>
      )

} export default MediaLibrary;