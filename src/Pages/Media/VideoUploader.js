import {React, useState, useEffect} from 'react';
import {storage, db} from "../Firebase";
import { ref as strgRef, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { set, onValue, ref as dbRef } from 'firebase/database';
import { uid } from 'uid';
import classes from './VideoUploader.module.css';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import _ from 'lodash';

function VideoUploader(props){

      const [uploadingState, setUploadingState] = useState(false);
      //const [video, setVideo] = useState([]);
      const [video, setVideo] = useState(null);


      const [promptText, setPromptText] = useState('');
      const [successText, setSuccessText] = useState(false);
      const [VideosAmt, setVideosAmt] = useState(0);
      const [VideoIDs, setVideoIDs] = useState('');
      //const [downloadURL, setDownloadURL] = useState('');

      const [alignment, setAlignment] = useState('180');
      var videosAmt = 0;
      var videoIDs = '';
      

      const videoDataArray = [];
  
      var videoAliasRef = '';
      var videoTitleRef = '';
      var videoDurationRef = '';

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

            
            /*if(videoNameRef.current.value !== ''){
                  console.log
                  videoAlias = video[0].name;
                  console.log(videoAlias);
            } else {
                  videoAlias = videoNameRef.current.value + '.mp4';
            }*/

            
            setUploadingState(true);

            videoAliasRef = document.getElementById("videoNameInputID").value;
            videoTitleRef = document.getElementById("videoTitleInputID").value;
            videoDurationRef = document.getElementById("videoDurationInputID").value;
            if(videoAliasRef==='' || videoTitleRef==='' || videoDurationRef===''){return setPromptText('At least one input is missing.')}
            

            if(video === null) {return alert("No video has been selected.");};
            const videoUID = uid();
            const videoRef = strgRef(storage, `Videos/${video.name}_${videoUID}`);
            const uploadTask = uploadBytesResumable(videoRef, video);

            uploadTask.on(
                  "state_changed",
                  (snapshot) => {
                        const progress = Math.round(
                              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setPromptText('Uploading video: ' + progress + '%');
                  },
                  (err) => {console.log(err); setPromptText('Error. Check console for details.')},
                  () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                              //setDownloadURL(url);
                              //console.log(url);
                              infoUpload(videoUID, url);
                        });
                        
                        nextActions();
                  },
                  //() => {nextActions()}
            )
      };

      
      function infoUpload(videoUID, url){
            
            /*onValue(dbRef(db, '/VideosAmt' ), snapshot => {
                  videosAmt = snapshot.val();
            });   
            //console.log(videosAmt);
            
            onValue(dbRef(db, '/VideoIDs' ), snapshot => {
                  videoIDs = snapshot.val();
            });
            //console.log(VideoIDs);*/

            const current = new Date();
            const videoData = {
                  Active: false,
                  Alias: videoAliasRef,
                  'Date_(D-M-Y)': `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`,
                  Duration: videoDurationRef,
                  ID: videoUID,
                  Title: videoTitleRef,
                  TouchpointsAmt: 0,
                  DownloadURL: url,
                  Type: alignment,
                  VideoIndex: videosAmt,
                  StorageName: `${video.name}_${videoUID}`,
            }
            const videoFeedbackData = {
                  Count: 0,
                  'Date_(D-M-Y)': `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`,
                  Status: 'Inactive',
                  Title: videoTitleRef,
                  TotalResponses: 0,
                  Touchpoints: '',
            }
            //console.log(videoUID);
            //console.log(url);
            //console.log(videoData);
            
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

      
      const handleChange = (event, newAlignment) => {
            setAlignment(newAlignment);
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
                                    
                                    <label className = {classes.boldFont}>Video Duration in seconds:</label>
                                    <br/>
                                    <input className = {classes.inputText} name="videoDurationInputID" type="text" id="videoDurationInputID" />
                                    <br/>
                                    <br/>

                                    
                                    <label className = {classes.boldFont}>Video Type:</label>
                                    <br/>
                                    <ToggleButtonGroup color="primary" exclusive aria-label="text alignment" onChange={handleChange} value={alignment}>
                                          <ToggleButton value="180" aria-label="180 aligned">180 Degrees</ToggleButton>
                                          <ToggleButton value="360" aria-label="360 aligned">360 Degrees</ToggleButton>
                                    </ToggleButtonGroup>
                              </div>
                              <br/>
                              <input type="file" onChange={(e) => setVideo(e.target.files[0])} />
                              <br/>
                              <button  className = {classes.uploadImg} onClick = {uploadingState? null:handleUpload}>Upload Selected Video</button>
                              <br/>
                              {<p className = {successText? classes.boldFont:null}>{promptText}</p>}
                        </div>
                  </div>                  
            </div>

      );
} export default VideoUploader;