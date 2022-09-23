import { useRef, useState } from 'react';
import classes from './Form.module.css';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import ImageUploader from './MCI/ImageUploader';
import GalleryDropdown from './MCI/GalleryDropdown';
import Gallery from './MCI/Gallery';
import {uid} from 'uid';
import _ from 'lodash';


function MCIForm(props) {
    const selectedIDs = [];
    const selectedNames = [];
    const touchpointAlias = useRef();
    const touchpointPrompt = useRef();
    const [touchpointIDs, setTouchpointIDs] = useState('');


    var aliasDefaultValue = '';
    var promptDefaultValue = '';
    var titleDefaultValue = 'Multiple Choice w/ Images';
    var duplicateAliasPrompt = '';

    if (props.view === true || props.duplicate ===true) {
        aliasDefaultValue = props.arrayOfTemplates.Alias;
        promptDefaultValue = props.arrayOfTemplates.Prompt;
        var x = _.split(props.arrayOfTemplates.ImageIDs, '/');
        var y = _.split(props.arrayOfTemplates.ImageNames, '/');
        for(let id in x){
            selectedIDs.push(x[id]);
        }
        for(let name in y){
            selectedNames.push(y[name]);
        }
        //console.log(selectedIDs);
    }
    if(props.duplicate === true){
        titleDefaultValue = 'Multiple Choice w/ Images - Duplicate';
        duplicateAliasPrompt = '(Make sure to change the duplicate\'s alias!)';
    }

    function deleteTemplate(){
        props.deleteFromDatabase(props.arrayOfTemplates.UID);
    }

    function deleteButtonHandler(){
        if(props.view){
            return (<Link to = '/Goldilocks-Suds-Website-Deploy/touchpoint-template-library'>
                        <button onClick = {deleteTemplate}>Delete Template</button>
                    </Link>);
        }
    }
    
    
    function addID(ID){
        selectedIDs.push(ID);
    }
    function removeID(ID){
        _.remove(selectedIDs, function(n){return n===ID});
    }

    function addName(name){
        selectedNames.push(name);
    }
    function removeName(name){
        _.remove(selectedNames, function(n){return n===name});
    }


    function SubmitHandler(event) {
        event.preventDefault();

        const enteredAlias = touchpointAlias.current.value;
        const enteredPromptQuestion = touchpointPrompt.current.value;
        var stringSelectedIDs = _.join(selectedIDs, '/');
        var stringSelectedNames = _.join(selectedNames, '/');

        const touchpointValues = {
            UID: ((props.duplicate) ? uid() : ((props.view) ? props.arrayOfTemplates.UID : uid())),
            Alias: enteredAlias,
            Prompt: enteredPromptQuestion,
            Type: 'MCI',
            TimesUsed: ((props.duplicate) ? 0 : ((props.view) ? props.arrayOfTemplates.TimesUsed:0)),
            ImageIDs: stringSelectedIDs,
            ImageNames: stringSelectedNames,
        };
        props.writeToDatabase(touchpointValues);

        

        window.location.href = '/Goldilocks-Suds-Website-Deploy/touchpoint-template-library';
    };
    
    const [showImageUploader, setShowImageUploader] = useState(false);
    function toggleImageUploader(){
        setShowImageUploader(!showImageUploader);
    }

    function returnModal () {
        return ( <ImageUploader toggle={toggleImageUploader}/>);
    }


    return (
        <div>
            <h2 className={classes.h2}>{titleDefaultValue}</h2>
            <h3 className={classes.h3}>
                In this touchpoint type, the user will be prompted with an open-ended question. The user will respond by selecting a corresponding image from multiple image options.
            </h3>
            <br></br>
            <form className={classes.form}>
                <div className={classes.control}>
                    <label htmlFor='alias'>Touchpoint Template Name (or Alias):</label>
                    <label className={classes.label}>{duplicateAliasPrompt}</label>
                    <TextField id='outlined-basic' variant='outlined' inputRef={touchpointAlias} defaultValue={aliasDefaultValue} fullWidth />
                </div>
                <div className={classes.control}>
                    <label htmlFor='prompt'>Question displayed to user:</label>
                    <TextField id='outlined-basic' variant='outlined' inputRef={touchpointPrompt} defaultValue={promptDefaultValue} fullWidth />
                </div>
            </form>
            <div className = {classes.actions}>
                <button onClick={SubmitHandler}>Save Template</button>
                <Link to='/Goldilocks-Suds-Website-Deploy/touchpoint-template-library'>
                    <button>Go Back</button>
                </Link>
                {deleteButtonHandler()}
                <button onClick = {toggleImageUploader}>Upload Images</button>
                {showImageUploader?  returnModal():null }
            </div>
            <div>
                {(props.view||props.duplicate)? <Gallery chosenFile = {selectedIDs[0]} removeID={removeID} addID={addID} addName={addName} removeName={removeName} existing={true} selectedIDs={selectedIDs}/>:<GalleryDropdown removeID={removeID} addID={addID} addName={addName} removeName={removeName}/>}
            </div>
        </div>
    );
}
export default MCIForm;