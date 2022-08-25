import React, { useState, useEffect, useRef } from 'react';
import './EditVideo.css';
import {selectedVideoID} from '../MediaTable';
import {db} from '../../Firebase';
import {ref, onValue, remove, set} from "firebase/database";
import ExistingTouchpoint from './ExistingTouchpoint.js';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/sea/index.css';
import _, { drop } from 'lodash';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
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

      useEffect(() => {
            onValue(ref(db, `/Videos/${selectedVideoID}` ), snapshot => {
                  const vidData = snapshot.val();
                  if(vidData !== null){
                        setVideoData(vidData);
                        setVideoState(vidData.Active);
                  };
            });    
      }, []);

      useEffect(() => {
            onValue(ref(db, '/TouchpointTemplates' ), snapshot => {
                  const tpData = snapshot.val();
                  if(tpData !== null){
                        setTpTemplatesData(tpData);
                        setIsLoading(false);
                  };
            });    
      }, []);
      
      const types = {
            R10: '10-Based Rating',
            R5: '5-Based Rating', 
            MCI: 'Multiple Choice w/ Images',
            MC: 'Multiple Choice',
            FF: 'Freeform Input',
      }
      for(let x in tpTemplatesData){
            templateDropdownOptions.push({
                  label: tpTemplatesData[x].Alias, id: tpTemplatesData[x].UID, type: types[tpTemplatesData[x].Type],
            });
      }
      console.log(templateDropdownOptions);


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

      console.log(videoData.Touchpoints);

      const uniqueTemplateIDs = [];
      const videoDataTouchpoints = videoData.Touchpoints;

      for(let x in videoDataTouchpoints){
            uniqueTemplateIDs.push(x);
      }

      const [touchpoint, setTouchpoint] = useState(null);
      const [selectedTemplateName, setSelectedTemplateName] = useState(null);
      const [selectedTemplateType, setSelectedTemplateType] = useState(null);
      const [selectedTemplateID, setSelectedTemplateID] = useState(null);

      function deleteHandler(){
            remove(ref(db, `Videos/${selectedVideoID}/Touchpoints/${touchpoint}`));
            setTouchpointIsSelected(false);
      }

      function deleteVideoHandler(){
            remove(ref(db, `Videos/${selectedVideoID}`));
      }

      function addHandler(){
            if(touchpointIsSelected){ setTouchpointIsSelected(false); }
            setCreateNewTouchpoint(true);
      }

      function saveHandler(){
            var uploadString = currentTime + '/' + uploadValue;
            set(ref(db, `Videos/${selectedVideoID}/Touchpoints/${uid()}`), uploadString);
            setDropdownValue('');
            setCreateNewTouchpoint(false);

      }

      function timeHandler(){
            setCurrentTime(Math.floor(playerRef.current.currentTime()));
      }

      function stateHandler(){
            set(ref(db, `Videos/${selectedVideoID}/Active`), !videoState);
            setVideoState(!videoState);
            
      }

      const handleDropdownChange = (event, newDropdownValue) => {
            setDropdownValue(newDropdownValue.label);
            setUploadValue(newDropdownValue.id)
      }

      const handleChange = (event, newTouchpoint) => {
            if(createNewTouchpoint){ setCreateNewTouchpoint(false); }
            if(!touchpointIsSelected){ setTouchpointIsSelected(true); }
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
                                    const data = _.split(videoDataTouchpoints[IDs], '/');
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
                              <div data-vjs-player>
                                    <video ref={videoRef} className={`video-js vjs-big-play-centered vjs-theme-sea}`}/>
                              </div>
                              <br/>
                              <div>
                                    <h5>Current state: {videoState? 'Active':'Inactive'}</h5> 
                                    <button className='btnState' onClick={stateHandler}>Set State</button>
                                    <br/>
                                    <br/>
                                    <Link to = '/Goldilocks-Suds-Website-Deploy/media'>
                                          <button className='btnState' onClick={deleteVideoHandler}>Delete Video</button>
                                    </Link>
                                    <br/>
                                    <br/>
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