import { useRef } from 'react';
import classes from './Form.module.css';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

function R5Form(props) {

    const touchpointAlias = useRef();
    const touchpointPrompt = useRef();
    const touchpointLeftOption = useRef();
    const touchpointCenterOption = useRef();
    const touchpointRightOption = useRef();

    var aliasDefaultValue = '';
    var promptDefaultValue = '';
    var leftOptionDefaultValue = '';
    var rightOptionDefaultValue = '';
    var centerOptionDefaultValue = '';
    var duplicateAliasPrompt = '';
    var titleDefaultValue = '5-Based Rating';

    if (props.view === true || props.duplicate ===true) {
        aliasDefaultValue = props.arrayOfTemplates.Alias;
        promptDefaultValue = props.arrayOfTemplates.Prompt;
        leftOptionDefaultValue = props.arrayOfTemplates.LeftOption;
        centerOptionDefaultValue = props.arrayOfTemplates.CenterOption;
        rightOptionDefaultValue = props.arrayOfTemplates.RightOption;
    }
    if(props.duplicate === true){
        titleDefaultValue = '5-Based Rating - Duplicate';
        duplicateAliasPrompt = '(Make sure to change the duplicate\'s alias!)';
    }

    function SubmitHandler(event) {
        event.preventDefault();

        const enteredAlias = touchpointAlias.current.value;
        const enteredPromptQuestion = touchpointPrompt.current.value;
        const enteredLeftOption = touchpointLeftOption.current.value;
        const enteredCenterOption = touchpointCenterOption.current.value;
        const enteredRightOption = touchpointRightOption.current.value;

        const touchpointValues = {
            //uid: ((existing) ? props.arrayOfTemplates.uid : uid()),
            UID: props.arrayOfTemplates.UID,
            Alias: enteredAlias,
            Prompt: enteredPromptQuestion,
            LeftOption: enteredLeftOption,
            CenterOption: enteredCenterOption,
            RightOption: enteredRightOption,
            Type: 'R5',
            TimesUsed: props.arrayOfTemplates.TimesUsed,
            //TimesUsed: ((existing) ? props.arrayOfTemplates.TimesUsed : 0),
        };
        props.writeToDatabase(touchpointValues);
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

    return (
        <div>
            <h2 className={classes.h2}>{titleDefaultValue}</h2>
            <h3 className={classes.h3}>
                In this touchpoint type, the user will be prompted a close ended question,
                and will be allowed to evaluate it in a -2 to 2 rating scale.
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
                <div className={classes.control}>
                    <label htmlFor='leftOption'>Leftest Evaluation. Corresponds to number -2 in the -2 to 2 rating scale.</label>
                    <label>E.g. 'Completely Disagree':</label>
                    <TextField id='outlined-basic' variant='outlined' inputRef={touchpointLeftOption} defaultValue={leftOptionDefaultValue} fullWidth />
                </div>
                <div className={classes.control}>
                    <label htmlFor='centerOption'>Middle Evaluation. Corresponds to number 0 in the -2 to 2 rating scale.</label>
                    <label>E.g. 'Neutral':</label>
                    <TextField id='outlined-basic' variant='outlined' inputRef={touchpointCenterOption} defaultValue={centerOptionDefaultValue} fullWidth />
                </div>
                <div className={classes.control}>
                    <label htmlFor='rightOption'>Rightest Evaluation. Corresponds to number 2 in the -2 to 2 rating scale.</label>
                    <label>E.g. 'Completely Agree':</label>
                    <TextField id='outlined-basic' variant='outlined' inputRef={touchpointRightOption} defaultValue={rightOptionDefaultValue} fullWidth />
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
export default R5Form;