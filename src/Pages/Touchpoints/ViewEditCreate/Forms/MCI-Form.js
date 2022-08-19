import { useRef, useState } from 'react';
import classes from './Form.module.css';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { uid } from 'uid';
import ImageUploader from './MCI/ImageUploader';
import Gallery from './MCI/Gallery';



function MCIForm(props) {

    const touchpointAlias = useRef();
    const touchpointPrompt = useRef();
    var existing = false;

    var aliasDefaultValue = '';
    var promptDefaultValue = '';
    var titleDefaultValue = 'Multiple Choice w/ Images';
    var duplicateAliasPrompt = '';

    if (props.view === true || props.duplicate ===true) {
        aliasDefaultValue = props.arrayOfTemplates.Alias;
        promptDefaultValue = props.arrayOfTemplates.Prompt;
        existing = true;
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

    function SubmitHandler(event) {
        event.preventDefault();

        const enteredAlias = touchpointAlias.current.value;
        const enteredPromptQuestion = touchpointPrompt.current.value;

        const touchpointValues = {
            uid: ((existing) ? props.arrayOfTemplates.UID : uid()),
            //UID: props.arrayOfTemplates.UID,
            Alias: enteredAlias,
            Prompt: enteredPromptQuestion,
            Type: 'MCI',
            //TimesUsed: props.arrayOfTemplates.TimesUsed,
            TimesUsed: ((existing) ? props.arrayOfTemplates.TimesUsed : 0),
        };
        props.writeToDatabase(touchpointValues);
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
                In this touchpoint type, the user will be prompted an open-ended question and will be
                allowed to answer it by selecting from multiple images.
            </h3>
            <br></br>
            <form className={classes.form}>
                <div className={classes.control}>
                    <label htmlFor='alias'>Alias used to recognize the touchpoint template:</label>
                    <label className={classes.label}>{duplicateAliasPrompt}</label>
                    <TextField id='outlined-basic' variant='outlined' inputRef={touchpointAlias} defaultValue={aliasDefaultValue} fullWidth />
                </div>
                <div className={classes.control}>
                    <label htmlFor='prompt'>Question prompted to user:</label>
                    <TextField id='outlined-basic' variant='outlined' inputRef={touchpointPrompt} defaultValue={promptDefaultValue} fullWidth />
                </div>
            </form>

            <div>
                
            </div>



            <div className = {classes.actions}>
                <button onClick={SubmitHandler}>Save Template</button>
                <Link to='/Goldilocks-Suds-Website-Deploy/touchpoint-template-library'>
                    <button>Go Back</button>
                </Link>
                {deleteButtonHandler()}
                <button onClick = {toggleImageUploader}>Upload Images</button>
                {showImageUploader &&  returnModal() }
                
                
                {/*ImageUploader toggle = {toggleImageUploader}/>:null*/}
            </div>
            <Gallery/>

        </div>
    );
}
export default MCIForm;