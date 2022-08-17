import { useRef } from 'react';
import classes from './Form.module.css';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

function R10Form(props) {
    //let propsArr = props;
    const touchpointAlias = useRef('');
    const touchpointPrompt = useRef('');
    const touchpointMinimumOption = useRef('');
    const touchpointMaximumOption = useRef('');

    var aliasDefaultValue = '';
    var promptDefaultValue = '';
    var minimumOptionDefaultValue = '';
    var maximumOptionDefaultValue = '';
    var duplicateAliasPrompt = '';
    var titleDefaultValue = '10-Based Rating';

    console.log(props.duplicate);
    if (props.view === true || props.duplicate ===true) {
        aliasDefaultValue = props.arrayOfTemplates.Alias;
        promptDefaultValue = props.arrayOfTemplates.Prompt;
        minimumOptionDefaultValue = props.arrayOfTemplates.MinimumOption;
        maximumOptionDefaultValue = props.arrayOfTemplates.MaximumOption;
        
    } 
    if(props.duplicate === true){
        titleDefaultValue = '10-Based Rating - Duplicate';
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
            //uid: ((props.duplicate) ? props.arrayOfTemplates.uid : uid()),
            UID: props.arrayOfTemplates.UID,
            Alias: enteredAlias,
            Prompt: enteredPromptQuestion,
            MaximumOption: enteredMaximumOption,
            MinimumOption: enteredMinimumOption,
            Type: 'R10',
            TimesUsed: props.arrayOfTemplates.TimesUsed,
            //TimesUsed: ((props.duplicate) ? props.arrayOfTemplates.TimesUsed : 0),
        };
        props.writeToDatabase(touchpointValues);
        alert("Template content has been successfully updated!")
    }

    return (
        <div>
            <h2 className={classes.h2}>{titleDefaultValue}</h2>
            <h3 className={classes.h3}>
                In this touchpoint type, the user will be prompted a close ended question,
                and will be allowed to evaluate it in a 1 to 10 rating scale.
            </h3>
            <br></br>
            <form className={classes.form} /*onSubmit = {SummitHandler}*/>
                <div className={classes.control}>
                    <label htmlFor='alias'>Alias used to recognize the touchpoint template:</label>
                    <label className={classes.label}>{duplicateAliasPrompt}</label>
                    <TextField id='outlined-basic' variant='outlined' inputRef={touchpointAlias} defaultValue={aliasDefaultValue} fullWidth />
                </div>
                <div className={classes.control}>
                    <label htmlFor='prompt'>Question prompted to user:</label>
                    <TextField id='outlined-basic' variant='outlined' inputRef={touchpointPrompt} defaultValue={promptDefaultValue} fullWidth />
                </div>
                <div className={classes.control}>
                    <label htmlFor='maximumOption'>Maximum Evaluation. Corresponds to number 10 in the 1-10 rating scale.</label>
                    <label>E.g. 'Ideal', 'Excellent', 'Completely Agree', etc.: </label>
                    <TextField id='outlined-basic' variant='outlined' inputRef={touchpointMaximumOption} defaultValue={maximumOptionDefaultValue} fullWidth />
                </div>
                <div className={classes.control}>
                    <label htmlFor='minimumOption'>Minimum Evaluation. Corresponds to number 1 in the 1-10 rating scale.</label>
                    <label>E.g. 'Not Ideal', 'Very Poor', 'Completely Disagree', etc.: </label>
                    <TextField id='outlined-basic' variant='outlined' inputRef={touchpointMinimumOption} defaultValue={minimumOptionDefaultValue} fullWidth />
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
export default R10Form;