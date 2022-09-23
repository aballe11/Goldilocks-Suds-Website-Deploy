import React, { useState, useEffect, useRef } from 'react';
import './EditVideo.css';
import {selectedVideoID} from '../MediaTable';
import {db, storage} from '../../Firebase';
import {ref as dbRef, onValue, remove, set, get} from "firebase/database";
import {deleteObject, ref as srgRef} from "firebase/storage";
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/sea/index.css';
import _ from 'lodash';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {uid} from 'uid';
import { Link } from 'react-router-dom';


function EditVideo(){

      const [videoData, setVideoData] = useState({});
      const [tpTemplatesData, setTpTemplatesData] = useState({});
      const [isLoading, setIsLoading] = useState(true);
      const templateDropdownOptions = [];
      const [touchpointIsSelected, setTouchpointIsSelected] = useState(false);
      const [createNewTouchpoint, setCreateNewTouchpoint] = useState(false);
      const [currentTime, setCurrentTime] = useState(0);
      const [dropdownValue, setDropdownValue] = useState('');
      const [videoState, setVideoState] = useState('');
      const [uploadValue, setUploadValue] = useState('');
      const [VideosAmt, setVideosAmt] = useState(0);
      const [VideoIDs, setVideoIDs] = useState('');
      const [storageName, setStorageName] = useState('');
      const [touchpointCount, setTouchpointCount] = useState(0);
      const [videoName, setVideoName] = useState('');
      const [thumbnailStorageName, setThumbnailStorageName] = useState('');
       
      

      useEffect(() => {
            onValue(dbRef(db, `/Videos/${selectedVideoID}` ), snapshot => {
                  const vidData = snapshot.val();
                  if(vidData !== null){
                        setVideoData(vidData);
                        setVideoName(vidData.Alias);
                        setVideoState(vidData.Active);
                  };
            });    
      }, []);


      useEffect(() => {
            onValue(dbRef(db, `/Videos/${selectedVideoID}/StorageName` ), snapshot => {
                  const strgName = snapshot.val();
                  if(strgName !== null){
                        setStorageName(strgName);
                  };
            });    
      }, []);

      useEffect(() => {
            onValue(dbRef(db, `/Videos/${selectedVideoID}/ThumbnailStorageName` ), snapshot => {
                  const thmbStrgName = snapshot.val();
                  if(thmbStrgName !== null){
                        setThumbnailStorageName(thmbStrgName);
                  };
            });    
      }, []);

      useEffect(() => {
            onValue(dbRef(db, `/VideoIDs` ), snapshot => {
                  const vidIDs = snapshot.val();
                  //console.log(vidIDs);
                  if(vidIDs !== null){
                        setVideoIDs(vidIDs);
                  };
            });    
      }, []);


      useEffect(() => {
            onValue(dbRef(db, `/VideosAmt` ), snapshot => {
                  const vidAmt = snapshot.val();
                  //console.log(vidAmt);
                  if(vidAmt !== null){
                        setVideosAmt(vidAmt);
                  };
            });    
      }, []);

      useEffect(() => {
            onValue(dbRef(db, `/Feedback/${selectedVideoID}/Count` ), snapshot => {
                  const cnt = snapshot.val();
                  //console.log(cnt);
                  if(cnt !== null){
                        setTouchpointCount(cnt);
                  };
            });    
      }, []);

      useEffect(() => {
            onValue(dbRef(db, '/TouchpointTemplates' ), snapshot => {
                  const tpData = snapshot.val();
                  if(tpData !== null){
                        setTpTemplatesData(tpData);
                        setIsLoading(false);
                  };
            });    
      }, []);
      
      const types = {
            R10: '10-Point Rating',
            R5: '5-Point Rating', 
            MCI: 'Multiple Choice w/ Images',
            MC: 'Multiple Choice',
            FF: 'Freeform Input',
      }

      for(let x in tpTemplatesData){
            templateDropdownOptions.push({
                  label: tpTemplatesData[x].Alias, id: tpTemplatesData[x].UID, type: types[tpTemplatesData[x].Type],
            });
      }

      //console.log(templateDropdownOptions);


      const options = {
            autoplay: false,
            controls: true,
            sources: [{
                  src: videoData.DownloadURL,
                  type: 'video/mp4',
            }],
      };

      const videoRef = useRef(null);
      const playerRef = useRef(null);
      
      useEffect(()=> {
            const player = playerRef.current;
            if(!player) {
                  const videoElement = videoRef.current;
                  if(!videoElement) {return;};
                  playerRef.current = videojs(videoElement, options)
            };
      }, [options, videoRef, playerRef])

      var uniqueTemplateIDs = [];
      var arr = videoData.Touchpoints;
      var arrayOfTemplatess = [];

      for(let x in arr){
            var y =_.split(arr[x], '/');
            var h =  _.parseInt(y[0]);
            var z = _.sortedIndex(arrayOfTemplatess, h);
            arrayOfTemplatess.splice(z, 0, _.parseInt(y[0]));
            uniqueTemplateIDs.splice(z, 0, x);
      }

      const [touchpoint, setTouchpoint] = useState(null);
      const [selectedTemplateName, setSelectedTemplateName] = useState(null);
      const [selectedTemplateType, setSelectedTemplateType] = useState(null);
      const [selectedTemplateID, setSelectedTemplateID] = useState(null);

      function deleteHandler(){
            //console.log(touchpoint);
            remove(dbRef(db, `Videos/${selectedVideoID}/Touchpoints/${touchpoint}`));
            remove(dbRef(db, `Feedback/${selectedVideoID}/Touchpoints/${touchpoint}`));
            set(dbRef(db, `Feedback/${selectedVideoID}/Count`), touchpointCount-1);
            set(dbRef(db, `Videos/${selectedVideoID}/TouchpointsAmt`), touchpointCount-1);
            setTouchpointIsSelected(false);
      }

      function deleteVideoHandler(){
            remove(dbRef(db, `Videos/${selectedVideoID}`));
            remove(dbRef(db, `Feedback/${selectedVideoID}`));

            set(dbRef(db, 'VideosAmt/'), VideosAmt - 1)


            var x = _.split(VideoIDs, '/');
            x = _.without(x, selectedVideoID);
            var vidIDs = _.join(x, '/');
            set(dbRef(db, 'VideoIDs/'), vidIDs)

            deleteObject(srgRef(storage, `Videos/${storageName}` )).then(()=>{/*console.log('Video Delete successful!')*/}).catch((error)=>{console.log(error)});
            deleteObject(srgRef(storage, `Thumbnails/${thumbnailStorageName}` )).then(()=>{/*console.log('Thumbnail Delete successful!')*/}).catch((error)=>{console.log(error)});
      }

      function addHandler(){
            if(touchpointIsSelected){ setTouchpointIsSelected(false); }
            setCreateNewTouchpoint(true);
      }

      function saveHandler(){
            var uploadString = currentTime + '/' + uploadValue;
            var newTpID = uid();
            set(dbRef(db, `Videos/${selectedVideoID}/Touchpoints/${newTpID}`), uploadString);
            //console.log(tpTemplatesData);
            var feedbackDict = {};
            switch(tpTemplatesData[uploadValue].Type){
                  case 'MCI':
                        feedbackDict['Total'] = 0; feedbackDict ['Type'] = 'MCI'; feedbackDict['Alias'] = tpTemplatesData[uploadValue].Alias;
                        var images = _.split(tpTemplatesData[uploadValue].ImageNames, '/'); feedbackDict['Time'] = currentTime;
                        for(let x in images){
                              feedbackDict[images[x]] = 0;
                        }
                        
                        break;
                  case 'MC':
                        feedbackDict = {
                              Option_1_1: 0, Option_2_2: 0, Option_3_3: 0, Option_4_4: 0, Total: 0, 
                              Type: 'MC', Alias: tpTemplatesData[uploadValue].Alias, Time: currentTime,
                        };
                        break;
                  case 'FF':
                        feedbackDict = {
                              Responses: "", Total: 0, Type: 'FF', Alias: tpTemplatesData[uploadValue].Alias, Time: currentTime,
                        };
                        break;
                  case 'R10':
                        feedbackDict = {
                              Option_1_1: 0, Option_2_2: 0,Option_3_3: 0, Option_4_4: 0, Option_5_5: 0, Option_6_6: 0, Option_7_7: 0, Option_8_8: 0, 
                              Option_9_9: 0, Option_10_10: 0, Total: 0, Type: 'R10', Alias: tpTemplatesData[uploadValue].Alias, Time: currentTime,
                        };
                        break;
                  case 'R5':
                        feedbackDict = {
                              'Option_-2_1': 0, 'Option_-1_2': 0, Option_0_3: 0, Option_1_4: 0,
                              Option_2_5: 0, Total: 0, Type: 'R5', Alias: tpTemplatesData[uploadValue].Alias, Time: currentTime,
                        };
                        break;
            }
            set(dbRef(db, `Feedback/${selectedVideoID}/Count`), (touchpointCount+1));
            set(dbRef(db, `Videos/${selectedVideoID}/TouchpointsAmt`), (touchpointCount+1));

            set(dbRef(db, `Feedback/${selectedVideoID}/Touchpoints/${newTpID}`), feedbackDict);
            
            setDropdownValue('');
            setCreateNewTouchpoint(false);

      }

      function timeHandler(){
            setCurrentTime(Math.floor(playerRef.current.currentTime()));
      }

      function stateHandler(){
            set(dbRef(db, `Videos/${selectedVideoID}/Active`), !videoState);
            set(dbRef(db, `Feedback/${selectedVideoID}/Active`), !videoState);
            setVideoState(!videoState);
            
      }

      const handleDropdownChange = (event, newDropdownValue) => {
            setDropdownValue(newDropdownValue.label);
            setUploadValue(newDropdownValue.id)
            
      }

      const handleChange = (event, newTouchpoint) => {
            if(createNewTouchpoint){ setCreateNewTouchpoint(false); }
            if(!touchpointIsSelected){ setTouchpointIsSelected(true); }
            setTouchpoint(newTouchpoint);
            playerRef.current.currentTime();
      };

      const selectedTpID = (id, second) => {
            setSelectedTemplateName(tpTemplatesData[id].Alias);
            setSelectedTemplateType(tpTemplatesData[id].Type);
            setSelectedTemplateID(tpTemplatesData[id].UID);
            playerRef.current.currentTime(second);
      }


      

      var count = 0;
      if (isLoading) { return ( <section> <p> Loading... </p> </section> ); }
      return (
            
            <div>
                  <div className="row">
                        <div className="column left">
                        <br/>
                        <br/>
                        <br/>
                        <ToggleButtonGroup size = "small" color="primary" orientation="vertical" value={touchpoint} exclusive onChange={handleChange}>
                              {uniqueTemplateIDs.map((IDs) => {
                                    //console.log(videoDataTouchpoints[IDs]);
                                    const data = _.split(videoData.Touchpoints[IDs], '/');
                                    //console.log(data);
                                    var second = data[0];
                                    var id = data[1];
                                    count++;
                                    return(<ToggleButton key = {IDs} value = {IDs} onClick ={()=>{selectedTpID(id, second)}} aria-label="id">{count}: Second {second}</ToggleButton>)
                                    //return(<ExistingTouchpoint second = {second} id = {id} idTemplate = {tpTemplatesData.id} count = {count}/>);
                                    
                              })}
                        </ToggleButtonGroup>
                        <br/>
                        <br/>
                        <button className='btn' onClick={addHandler}>Create New</button>

                        
                              
                        </div>

                        <div className="column center">
                              <h1>Video Editor</h1>
                              <h5>&ensp;{videoName}</h5>
                              <div data-vjs-player>
                                    <video ref={videoRef} className={`video-js vjs-big-play-centered vjs-theme-sea}`}/>
                              </div>
                              <br/>
                              <div>
                                    <h5>&nbsp;Current state: {videoState? 'Active':'Inactive'}</h5> 
                                    
                                    &emsp;&emsp;&ensp;&nbsp;
                                    <button className='btnState' onClick={stateHandler}>Set State</button>
                                    &emsp;
                                    <Link to = '/Goldilocks-Suds-Website-Deploy/media'>
                                          <button className='btnState' onClick={deleteVideoHandler}>Delete Video</button>
                                    </Link>
                                    &emsp;
                                    <Link to = '/Goldilocks-Suds-Website-Deploy/media'>
                                          <button className='btnState'>Go Back</button>
                                    </Link>
                              </div>
                             
                        </div>
                              
                        <div className="column right">
                              <br/>
                              <br/>
                              <br/>
                              {touchpointIsSelected? 
                                    <div>
                                          <h5>Name:</h5>
                                          <h6>{selectedTemplateName}</h6>
                                          <br/>
                                          <h5>Type:</h5>
                                          <h6>{types[selectedTemplateType]}</h6>
                                          <br/>
                                          <h5>UID:</h5>
                                          <h6>{selectedTemplateID}</h6>
                                          <br/>
                                          <button className='btn' onClick={deleteHandler}>Delete Touchpoint</button>
                                          <br/>
                                          <br/>
                                    </div>
                              :null}
                              {createNewTouchpoint?   
                                    <div>
                                          <Autocomplete 
                                                value={dropdownValue}
                                                onChange={(event, newDropdownValue) => {handleDropdownChange(event, newDropdownValue)}}
                                                disablePortal 
                                                options={templateDropdownOptions.sort((a, b) => b.type.localeCompare(a.type) )}
                                                groupBy={(option) => option.type}
                                                id="templates-combo-box" /*options={templateDropdownOptions}*/ 
                                                sx={{ width: 300 }} 
                                                renderInput={(params) => <TextField {...params} 
                                                label="Template" />}/> 
                                          <br/>
                                          <h5>Creation Time:</h5>
                                          <h6>Second {Math.floor(playerRef.current.currentTime())}</h6>
                                          
                                          <button className='btnSmall' onClick={timeHandler}>Get Current Time</button>
                                          <br/>
                                          <br/>
                                          <br/>

                                          <button className='btn' onClick={saveHandler}>Save Touchpoint</button>
                                    </div>
                              : null}
                        </div>
                  </div>
            </div>
      ); 
} export default EditVideo;