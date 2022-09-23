import {React, useState, useEffect} from 'react';
import {storage, db} from "../Firebase";
import { ref as strgRef, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { set, onValue, ref as dbRef } from 'firebase/database';
import { uid } from 'uid';
import classes from './VideoUploader.module.css';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import _ from 'lodash';
import {getVideoDurationFromVideoFile} from '@rajesh896/video-thumbnails-generator';

function VideoUploader(props){

      const [uploadingState, setUploadingState] = useState(false);
      //const [video, setVideo] = useState([]);
      const [video, setVideo] = useState(null);
      const [thumbnail, setThumbnail] = useState(null);

      const [promptText, setPromptText] = useState('');
      const [successText, setSuccessText] = useState(false);
      const [VideosAmt, setVideosAmt] = useState(0);
      const [VideoIDs, setVideoIDs] = useState('');
      const [thumbnailURL, setThumbnailURL] = useState('');
      //const [downloadURL, setDownloadURL] = useState('');

      //const [alignment, setAlignment] = useState('180');
      const [dimensionsAlignment, setDimensionsAlignment] = useState('5K');
      var videosAmt = 0;
      var videoIDs = '';
      

      const videoDataArray = [];
  
      var videoAliasRef = '';
      var videoTitleRef = '';
      var videoDuration = 0;

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
      

      const handleUpload = (e) => {
            e.preventDefault();
            videoAliasRef = document.getElementById("videoNameInputID").value;
            videoTitleRef = document.getElementById("videoTitleInputID").value;
            //console.log(videoAliasRef);
            //console.log(videoTitleRef);
            //console.log(video);
            //console.log(thumbnail);

            if(/*videoAliasRef !== "" && videoTitleRef !== "" && video !== null &&*/ thumbnail !== null) {
                  setUploadingState(true);
                  
            
                  const videoUID = uid();

                  const videoRef = strgRef(storage, `Videos/${video.name}_${videoUID}`);
                  var x = thumbnail.name;
                  x = _.split(x, '.');
                  x = x[0];
                  const thumbnailRef = strgRef(storage, `Thumbnails/${x}_fd4f6be31d2`); //${videoUID}`);
                  
                  const uploadTask = uploadBytesResumable(videoRef, video);
                  const uploadThumbnailTask = uploadBytesResumable(thumbnailRef, thumbnail);

                  getVideoDurationFromVideoFile(video).then((duration) => {
                        videoDuration = duration;
                  });

                  uploadThumbnailTask.on(
                        "state_changed",
                        (err) => {console.log(err); setPromptText('Error. Check console for details.')},
                        () => {
                              getDownloadURL(uploadThumbnailTask.snapshot.ref).then((url) => {
                                    //console.log('Thumbnail Download URL: ' + url);
                                    setThumbnailURL(url);
                              });
                        },
                  );
                  
                  uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                              const progress = Math.round(
                                    
                                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                              );
                              
                              setPromptText('Uploading video: ' + progress + '%');
                        },
                        (err) => {console.log(err); setPromptText('Error. Check console for details.')},
                        //() => {
                        //      generateVideoThumbnails(video, 2).then((thumbnailArray) => {
                        //            setThumbnailImage(<img src = {thumbnailArray[1]} width="200px" height="200px" margin="10px" alt=""/>)
                        //      });
                        //},
                        () => {
                              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                                    infoUpload(videoUID, url);
                              });
                              nextActions();
                        },
                  );
            } else {
                  setPromptText('At least one input is missing.');
            }
      };

      
      function infoUpload(videoUID, videoURL){
            const current = new Date();
            var x = thumbnail.name;
            x = _.split(x, '.');
            x = x[0];
            const videoData = {
                  Active: false,
                  Alias: videoAliasRef,
                  'Date_(D-M-Y)': `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`,
                  Duration: Math.floor(videoDuration),
                  ID: videoUID,
                  Title: videoTitleRef,
                  TouchpointsAmt: 0,
                  DownloadURL: videoURL,
                  ThumbnailURL: thumbnailURL,
                  ThumbnailStorageName: `${x}_${videoUID}`,
                  StorageName: `${video.name}_${videoUID}`,
                  Resolution: dimensionsAlignment,
            }
            const videoFeedbackData = {
                  Count: 0,
                  'Date_(D-M-Y)': `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`,
                  Active: false,
                  Title: videoTitleRef,
                  TotalResponses: 0,
                  Touchpoints: '',
            }
            
            set(dbRef(db, 'Videos/' + videoUID ), videoData);
            set(dbRef(db, 'Feedback/' + videoUID ), videoFeedbackData);
            set(dbRef(db, 'VideosAmt/'), VideosAmt + 1);

            var x = _.split(VideoIDs, '/');
            x.push(videoUID);
            var vidIDs = _.join(x, '/');
            set(dbRef(db, 'VideoIDs/'), vidIDs);
            
           
      }

      function nextActions(){
            setUploadingState(false);
            setSuccessText(true);
            setPromptText('Video successfully uploaded!')
            quitModal();
      }

      async function quitModal() {
            new Promise(() => {
              setTimeout(() => props.toggle(), 2000)
            });
      }

      const handleDimensionsChange = (event, newAlignment) => {
            setDimensionsAlignment(newAlignment);
      };


      return(
            <div>
                  <div className={classes.modal}>
                        <div onClick = {props.toggle} className = {classes.overlay}/>
                        <div className = {classes.modalContent}>
                              <h3>Video Uploader</h3>
                              <button  className = {classes.closeModal} onClick = {props.toggle}>Close</button>
                              <br/>
                              <div>
                                    <label className = {classes.boldFont}>Video Alias:</label>
                                    <br/>
                                    <input className = {classes.inputText} name="videoNameInputID" type="text" id="videoNameInputID"/>
                                    <br/>
                                    <br/>

                                    <label className = {classes.boldFont}>Video Title shown to users: </label>
                                    <br/>
                                    <input className = {classes.inputText} name="videoTitleInputID" type="text" id="videoTitleInputID"/>
                                    <br/>
                                    <br/>
                                    
                                    {/*<label className = {classes.boldFont}>Video Type:</label>
                                    <br/>
                                    <ToggleButtonGroup color="primary" exclusive aria-label="text alignment" onChange={handleChange} value={alignment}>
                                          <ToggleButton value="180" aria-label="180 aligned">180 Degrees</ToggleButton>
                                          <ToggleButton value="360" aria-label="360 aligned">360 Degrees</ToggleButton>
                                    </ToggleButtonGroup>
                                    <br/>
                                    <br/>*/}
                                    <label className = {classes.boldFont}>Video Dimensions:</label>
                                    <br/>
                                    <ToggleButtonGroup color="primary" exclusive aria-label="text alignment" onChange={handleDimensionsChange} value={dimensionsAlignment}>
                                          <ToggleButton value="720p" aria-label="720P aligned">720p</ToggleButton>
                                          <ToggleButton value="1080p" aria-label="1080p aligned">1080p</ToggleButton>
                                          <ToggleButton value="2K" aria-label="2K aligned">2K</ToggleButton>
                                          <ToggleButton value="2060p" aria-label="2060p aligned">2060p</ToggleButton>
                                          <ToggleButton value="4K" aria-label="4K aligned">4K</ToggleButton>
                                          <ToggleButton value="5K" aria-label="5K aligned">5K</ToggleButton>
                                    </ToggleButtonGroup>
                              </div>
                              <br/>
                              <label className = {classes.boldFont}>Video File: &ensp;</label>
                              <input type="file" onChange={(e) => {setVideo(e.target.files[0]); }} />
                              <br/>
                              <br/>
                              <label className = {classes.boldFont}>Video Thumbnail File: &ensp;</label>
                              <input type="file" onChange={(e) => {setThumbnail(e.target.files[0]); }} />
                              <br/>
                              <button  className = {classes.uploadImg} onClick = {uploadingState? null:handleUpload}>Upload Selected Video</button>
                              <br/>
                              <br/>
                              {<p className = {successText? classes.boldFont:null}>{promptText}</p>}
                        </div>
                  </div>                  
            </div>

      );
} export default VideoUploader;