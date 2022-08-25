import {react, useState, useEffect} from 'react';
import { storage } from "../../../../Firebase";
import { listAll, ref, getDownloadURL } from 'firebase/storage';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import _ from 'lodash';
import classesx from '../../VECForm.module.css';
import Gallery from './Gallery';


function GalleryDropdown(props){

      const [dropdown, setDropdown] = useState(false);
      const [dropdownToggle, setDropdownToggle] = useState(true);
      const openCloseDropdown=()=>{
            setDropdown(!dropdown);
      }

      const listRef = ref(storage, 'Touchpoint Template Images/');
      const [folderNames, setFolderNames] = useState([]);
      //const [render, setRender] = useState(true)
      const [chosenFile, setChosenFile] = useState('');
      const [galleryToggle, setGalleryToggle] = useState(false);

      useEffect(()=> {
            listAll(listRef).then((response) => {
                  response.prefixes.forEach((folderRef) => {
                        var folderName = _.split(folderRef.fullPath, '/');
                        folderNames.push(folderName[1]);
                        //setFolderNames((prev) => [...prev, folderName[1]]);
                        //setFoldersList((prev) => [...prev, folderRef]);
                        
                        
                        //response.items.forEach((itemRef)=>{
                        //      console.log(itemRef);
                        //})
                  })
            });
            
      }, [])


      const  galleryData = (index) => {
            setChosenFile(index + '/' )
            //props.addID(chosenFile);
            setDropdownToggle(false);
            setGalleryToggle(true);


      }



      
      return(
            <div>
                  {dropdownToggle? <Dropdown isOpen={dropdown} toggle={openCloseDropdown}>
                        <DropdownToggle caret className={classesx.dropdownBtn}>
                              Image Selection
                        </DropdownToggle>
                        <DropdownMenu>
                              <DropdownItem header>Select a Folder...</DropdownItem>
                              <DropdownItem divider/>
                              {folderNames.map((index)=>{
                                    return (<DropdownItem key={index} onClick={()=>galleryData(index)}>{index}</DropdownItem>);
                              })}
                        </DropdownMenu>
                  </Dropdown>:null}
                  <br/>
                  {galleryToggle ? <Gallery chosenFile = {chosenFile} removeID={props.removeID} addID={props.addID} />:null}
                  
            </div>


      );
} export default GalleryDropdown;