import {React, useState, useRef} from 'react';
import {storage} from "../../../../Firebase";
import { ref, uploadBytes } from 'firebase/storage';
import { uid } from 'uid';
import classes from './ImageUploader.module.css';
import TextField from '@mui/material/TextField';
import _ from 'lodash';

function ImageUploader(props){
      
      const [uploadingState, setUploadingState] = useState(false);
      const [images, setImages] = useState([]);
      const [promptText, setPromptText] = useState('');
      const [successTxt, setSuccessTxt] = useState(false);
      const folderNameRef = useRef();

      const handleChange = (e) => {
          e.preventDefault();
          for(let i = 0; i < e.target.files.length; i++){
              const newImage = e.target.files[i];
              setImages((prevState) => [...prevState, newImage]);
          }
      };
  
      var enteredFolderTitle = 'General/';
      const handleUpload = (e) => {
            e.preventDefault();

            //console.log(folderNameRef.current.value);
            if(folderNameRef.current.value !== '') {
                  enteredFolderTitle = folderNameRef.current.value + '/';
            }
            setUploadingState(true);
            setPromptText('Uploading image(s)...')
            if(images.length === 0) {return alert("No images have been selected.");};
            const promises = [];
            images.map((image) => {
                  var imgName = _.split(image.name, '.');
                  const imageRef = ref(storage, `Touchpoint Template Images/${enteredFolderTitle}${imgName[0]}_${uid()}`);
                  const uploadTask = uploadBytes(imageRef, image);
                  promises.push(uploadTask);
            });
            Promise.all(promises).then(() => nextActions()).catch((err) => console.log(err));
      };

      function nextActions(){
            setUploadingState(false);
            setSuccessTxt(true);
            setPromptText('Image(s) successfully uploaded!')
            quitModal();
      }

      async function quitModal() {

            new Promise(() => {
              setTimeout(() => props.toggle(), 2000)
            });

          
            //resolbe("Done!")
            //let result = await promise; // wait until the promise resolves (*)
          
            //alert(result); // "done!"
      }

      

      return(
            <div>
                  <div className={classes.modal}>
                        <div onClick = {props.toggle} className = {classes.overlay}/>
                        <div className = {classes.modalContent}>
                              <h3>Select files to upload...</h3>
                              <button  className = {classes.closeModal} onClick = {props.toggle}>Close</button>
                              <br/>
                              <p className = {classes.boldFont}>Name new/exisiting folder or leave blank for general folder.</p>
                              <TextField id='outlined-basic' variant='outlined' inputRef={folderNameRef} fullWidth />
                              <br/>
                              <br/>
                              <input type="file" multiple onChange={handleChange} />
                              <button  className = {classes.uploadImg} onClick = {uploadingState? null:handleUpload}>Upload Selected Images</button>
                              {<p className = {successTxt? classes.boldFont:null}>{promptText}</p>}
                        </div>
                  </div>                  
            </div>

      );
} export default ImageUploader;