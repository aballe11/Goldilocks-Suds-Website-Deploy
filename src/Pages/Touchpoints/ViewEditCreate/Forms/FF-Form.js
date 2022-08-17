import { useRef } from 'react';
import TextField from '@mui/material/TextField';
import classes from './Form.module.css';
import { Link } from 'react-router-dom';


function FFForm(props) {

    const touchpointAlias = useRef();
    const touchpointPrompt = useRef();

    var aliasDefaultValue = '';
    var promptDefaultValue = '';
    var duplicateAliasPrompt = '';
    var titleDefaultValue = 'Freeform Input';

    if (props.view === true || props.duplicate ===true) {
        aliasDefaultValue = props.arrayOfTemplates.Alias;
        promptDefaultValue = props.arrayOfTemplates.Prompt;
    }
    if(props.duplicate === true){
        titleDefaultValue = 'Freeform Input - Duplicate';
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
            Type: 'FF',
            TimesUsed: props.arrayOfTemplates.TimesUsed,
            //TimesUsed: ((existing) ? props.arrayOfTemplates.TimesUsed : 0),
        };
        props.writeToDatabase(touchpointValues);
    }

    return (
        <div>
            <h2 className={classes.h2}>{titleDefaultValue}</h2>
            <h3 className={classes.h3}>
                In this touchpoint type, the user will be prompted an open-ended question.
                Feedback will be in long-answer text format.
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
export default FFForm;