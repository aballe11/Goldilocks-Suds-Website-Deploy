import { useRef, useState } from 'react';
import classes from './Form.module.css';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import {storage} from "../../../Firebase"
import { ref, uploadBytes } from 'firebase/storage';
import { uid } from 'uid';

function MCIForm(props) {

    const touchpointAlias = useRef();
    const touchpointPrompt = useRef();

    var aliasDefaultValue = '';
    var promptDefaultValue = '';
    var titleDefaultValue = 'Multiple Choice w/ Images';
    var duplicateAliasPrompt = '';

    if (props.view === true || props.duplicate ===true) {
        aliasDefaultValue = props.arrayOfTemplates.Alias;
        promptDefaultValue = props.arrayOfTemplates.Prompt;
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
            //uid: ((existing) ? props.arrayOfTemplates.uid : uid()),
            UID: props.arrayOfTemplates.UID,
            Alias: enteredAlias,
            Prompt: enteredPromptQuestion,
            Type: 'MCI',
            TimesUsed: props.arrayOfTemplates.TimesUsed,
            //TimesUsed: ((existing) ? props.arrayOfTemplates.TimesUsed : 0),
        };
        props.writeToDatabase(touchpointValues);
    };

    const [images, setImages] = useState([]);
    

    const handleChange = (e) => {
        e.preventDefault();
        for(let i = 0; i < e.target.files.length; i++){
            const newImage = e.target.files[i];
            newImage['id'] = uid();
            setImages((prevState) => [...prevState, newImage]);
        }
    };
    
    const handleUpload = (e) => {
        e.preventDefault();
        if(images.length === 0) {return alert("No images have been selected.");};
        const promises = [];
        images.map((image) => {
            const imageRef = ref(storage, `Touchpoint Template Images/${image.name}_${uid()}`);
            const uploadTask = uploadBytes(imageRef, image);
            promises.push(uploadTask);
        });
        Promise.all(promises).then(()=> alert("All images uploaded successfully!")).catch((err) => console.log(err));
    };
    
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

                <div /*className = {classes.actions}*/>
                    <input type="file" multiple onChange={handleChange} />
                    <button onClick = {handleUpload}>Upload Images</button> <br/>
                </div>         

                <div className={classes.actions}>
                    <button onClick={SubmitHandler}>Save Template</button>
                    <Link to='/Goldilocks-Suds-Website-Deploy/touchpoint-template-library'>
                        <button>Go Back</button>
                    </Link>
                    {deleteButtonHandler()}
                </div>
            </form>
        </div>
    );
}
export default MCIForm;