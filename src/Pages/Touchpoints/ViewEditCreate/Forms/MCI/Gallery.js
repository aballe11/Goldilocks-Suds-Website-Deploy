import {react, useState, useEffect} from 'react';
import classes from '../../../../../Components/UI/Card.module.css';
import {storage} from "../../../../Firebase";
import { listAll, ref, getDownloadURL } from 'firebase/storage';
import './Gallery.css';
import _ from 'lodash';


//const selectedIDs = [];
function Gallery(props){
      const imageListRef = ref(storage, `Touchpoint Template Images/${props.chosenFile}`);
      const [imageList, setImageList] = useState([]);  
      const [idList, setIdList] = useState([]);
      const [nameList, setNameList] = useState([]);
      const [errorText, setErrorText] = useState(false);
      
      useEffect(() => {
            listAll(imageListRef).then((response) => {
                  response.items.forEach((item) => {
                        var imgID = _.split(item.name, '_');
                        var imgName = _.split(imgID[0], '.');
                        getDownloadURL(item).then((url) => {
                              setImageList((prev) => [...prev, url]);
                              setIdList((prev) => [...prev, imgID[1]])
                              setNameList((prev) => [...prev, imgName[0]])
                        }) 
                  });
            });
      }, []);

      var imagesURLDict = {};
      for(let i = 0; i < imageList.length; i++){
            imagesURLDict[idList[i]] = imageList[i];
      }
      var imagesNameDict = {};
      for(let i = 0; i < imageList.length; i++){
            imagesNameDict[idList[i]] = nameList[i];
      }
      //console.log(imagesURLDict);
      //console.log(imagesNameDict);

      const [selectedImagesAmt, setSelectedImagesAmt] = useState(0);
      const [firstCall, setFirstCall] = useState(true);
      if(props.existing && firstCall){ 
            setSelectedImagesAmt(props.selectedIDs.length-1)
            setFirstCall(false);

      } else if (!props.existing && firstCall){
            props.addID(_.replace(props.chosenFile, '/', ''));
            setFirstCall(false);
      }
      
      const idHandler = (key) => {
                  if(document.getElementById(key).firstChild.className==="opaque"){
                        if(errorText===true) setErrorText(false);
                        document.getElementById(key).firstChild.className = null;
                        document.getElementById(key).lastChild.textContent = "";
                        props.removeID(key);
                        props.removeName(imagesNameDict[key]);
                        setSelectedImagesAmt(selectedImagesAmt-1);
                 
                        
                  } else if((selectedImagesAmt) < 20) {
                        document.getElementById(key).firstChild.className = "opaque";
                        document.getElementById(key).lastChild.textContent = "Selected";
                        props.addID(key);
                        props.addName(imagesNameDict[key]);
                        setSelectedImagesAmt(selectedImagesAmt+1);
                  } else {
                        setErrorText(true);
                  };
      }

      return(
            <div>
                  <label>Selected images: {selectedImagesAmt}</label>
                  <br/>
                  <label>(20 Max)</label>
                  <br/>
                  {errorText? <label>Please select a max of 20 images.</label>:<br/>}
                  <div className = {classes.card}>
                        <div className ="gallery">
                              {idList.map((key) => {
                                    if(props.existing){
                                          if(props.selectedIDs.includes(key)){
                                                return(
                                                      <div className = "pics" key = {key} id={key} onClick={() => {idHandler(key)}}>
                                                            <img src={imagesURLDict[key]}  style={{width: '100%'}} className = "opaque"/>
                                                            <label className="label" >Selected</label>
                                                      </div> 
                                                );
                                          } else {
                                                return (
                                                      <div className = "pics" key = {key} id={key} onClick={() => {idHandler(key)}}>
                                                            <img src={imagesURLDict[key]}  style={{width: '100%'}}/>
                                                            <label className="label" ></label>
                                                      </div>
                                                );
                                          }
                                    } else{
                                          return (
                                                <div className = "pics" key = {key} id={key} onClick={() => {idHandler(key)}}>
                                                      <img src={imagesURLDict[key]}  style={{width: '100%'}}/>
                                                      <label className="label" ></label>
                                                </div>
                                          );
                                    }
                                    
                              })}
                        </div>
                  </div>
            </div>
            
      );
} export default Gallery;
//export {selectedIDs};