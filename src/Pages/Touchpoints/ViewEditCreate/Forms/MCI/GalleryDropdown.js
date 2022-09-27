import {react, useState, useEffect} from 'react';
import { storage } from "../../../../Firebase";
import { listAll, ref, getDownloadURL } from 'firebase/storage';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import _ from 'lodash';
import classesx from '../../VECForm.module.css';
import Gallery from './Gallery';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

//Generates a gallery dropdown to choose what images folder to populate the gallery with, then populates the gallery.
function GalleryDropdown(props){

      const [dropdown, setDropdown] = useState(false);
      const [dropdownToggle, setDropdownToggle] = useState(true);
      const [dropdownValue, setDropdownValue] = useState('');

      const listRef = ref(storage, 'Touchpoint Template Images/');
      const [folderNames, setFolderNames] = useState([]);
      const [chosenFile, setChosenFile] = useState('');
      const [galleryToggle, setGalleryToggle] = useState(false);

      useEffect(()=> {
            listAll(listRef).then((response) => {
                  response.prefixes.forEach((folderRef) => {
                        var folderName = _.split(folderRef.fullPath, '/');
                        folderNames.push(folderName[1]);
                  })
            });
      }, []);

      const folderNamesOptions = [];
      for(let x in folderNames){
            folderNamesOptions.push({
                  label: folderNames[x],
            });
      }

      const handleDropdownChange = (event, newDropdownValue) => {
            setDropdownValue(newDropdownValue);
            setChosenFile(newDropdownValue + '/' )
            setDropdownToggle(false);
            console.log(chosenFile);
            setGalleryToggle(true);
      }

      return(
            <div>
                  {dropdownToggle?  <Autocomplete 
                                          value={dropdownValue}
                                          onChange={(event, newDropdownValue) => {handleDropdownChange(event, newDropdownValue)}}
                                          disablePortal 
                                          options={folderNames}
                                          id="templates-combo-box" 
                                          sx={{ width: 300 }} 
                                          renderInput={(params) => <TextField {...params} 
                                          label="Select images folder..." />}/> : null}
                  <br/>
                  {galleryToggle ? <Gallery chosenFile = {chosenFile} removeID={props.removeID} addID={props.addID} addName ={props.addName} removeName={props.removeName}/>:null}
            </div>
      );
} export default GalleryDropdown;