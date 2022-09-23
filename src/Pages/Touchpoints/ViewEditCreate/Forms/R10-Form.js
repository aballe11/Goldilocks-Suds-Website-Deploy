import { useRef } from 'react';
import classes from './Form.module.css';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import {uid} from 'uid';

function R10Form(props) {

    const touchpointAlias = useRef('');
    const touchpointPrompt = useRef('');
    const touchpointMinimumOption = useRef('');
    const touchpointMaximumOption = useRef('');

    var aliasDefaultValue = '';
    var promptDefaultValue = '';
    var minimumOptionDefaultValue = '';
    var maximumOptionDefaultValue = '';
    var duplicateAliasPrompt = '';
    var titleDefaultValue = '10-Point Rating';

    if (props.view === true || props.duplicate === true) {

        aliasDefaultValue = props.arrayOfTemplates.Alias;
        promptDefaultValue = props.arrayOfTemplates.Prompt;
        minimumOptionDefaultValue = props.arrayOfTemplates.MinimumOption;
        maximumOptionDefaultValue = props.arrayOfTemplates.MaximumOption;
    } 
    
    if(props.duplicate === true){
        titleDefaultValue = '10-Point Rating - Duplicate';
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
        const enteredMaximumOption = touchpointMaximumOption.current.value;
        const enteredMinimumOption = touchpointMinimumOption.current.value;

        const touchpointValues = {
            UID: ((props.duplicate) ? uid() : ((props.view) ? props.arrayOfTemplates.UID:uid())),
            Alias: enteredAlias,
            Prompt: enteredPromptQuestion,
            MaximumOption: enteredMaximumOption,
            MinimumOption: enteredMinimumOption,
            Type: 'R10',
            TimesUsed: ((props.duplicate) ? 0 : ((props.view) ? props.arrayOfTemplates.TimesUsed:0)),
        };
        props.writeToDatabase(touchpointValues);
        window.location.href = '/Goldilocks-Suds-Website-Deploy/touchpoint-template-library';
    }

    return (
        <div>
            <h2 className={classes.h2}>{titleDefaultValue}</h2>
            <h3 className={classes.h3}>
                In this touchpoint, the user will be prompted with a close-ended question. The user will respond by selectiong a point on a ten-point Likert scale.
            </h3>
            <br></br>
            <form className={classes.form} /*onSubmit = {SummitHandler}*/>
                <div className={classes.control}>
                    <label htmlFor='alias'>Touchpoint Template Name (or Alias):</label>
                    <label className={classes.label}>{duplicateAliasPrompt}</label>
                    <TextField id='outlined-basic' variant='outlined' inputRef={touchpointAlias} defaultValue={aliasDefaultValue} fullWidth />
                </div>
                <div className={classes.control}>
                    <label htmlFor='prompt'>Question displayed to user:</label>
                    <TextField id='outlined-basic' variant='outlined' inputRef={touchpointPrompt} defaultValue={promptDefaultValue} fullWidth />
                </div>
                <div className={classes.control}>
                    <label htmlFor='maximumOption'>Left side point label: </label>
                    <TextField id='outlined-basic' variant='outlined' inputRef={touchpointMaximumOption} defaultValue={maximumOptionDefaultValue} fullWidth />
                </div>
                <div className={classes.control}>
                    <label htmlFor='minimumOption'>Right side point label: </label>
                    <TextField id='outlined-basic' variant='outlined' inputRef={touchpointMinimumOption} defaultValue={minimumOptionDefaultValue} fullWidth />
                </div>

                <div className={classes.actions}>
                    <Link to='/Goldilocks-Suds-Website-Deploy/touchpoint-template-library'>
                        <button onClick={SubmitHandler}>Save Template</button>
                    </Link>
                    <Link to='/Goldilocks-Suds-Website-Deploy/touchpoint-template-library'>
                        <button>Go Back</button>
                    </Link>
                    {deleteButtonHandler()}
                </div>
            </form>
        </div>
    );
}
export default R10Form;