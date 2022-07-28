import { useRef } from 'react';
import { arrayOfTemplates } from '../../TPLibrary/TouchpointTable';
import TextField from '@mui/material/TextField';
import classes from './Form.module.css';
import { Link } from 'react-router-dom';


function FFForm(props) {

    const touchpointAlias = useRef();
    const touchpointPrompt = useRef();

    var aliasDefaultValue = '';
    var promptDefaultValue = '';



    if (props.arrayOfTemplates !== undefined) {
        aliasDefaultValue = props.arrayOfTemplates.Alias;
        promptDefaultValue = props.arrayOfTemplates.Prompt;
    }

    function SubmitHandler(event) {
        event.preventDefault();

        const enteredAlias = touchpointAlias.current.value;
        const enteredPromptQuestion = touchpointPrompt.current.value;

        const touchpointValues = {
            Alias: enteredAlias,
            Prompt: enteredPromptQuestion,
            Type: 'FF',
            TimesUsed: arrayOfTemplates.TimesUsed,
        };
        props.writeToDatabase(touchpointValues);
    }

    return (
        <div>
            <h2 className={classes.h2}>Freeform Input</h2>
            <h3 className={classes.h3}>
                In this touchpoint type, the user will be prompted an open-ended question.
                Feedback will be in long-answer text format.
            </h3>
            <br></br>
            <form className={classes.form} onSubmit={SubmitHandler}>
                <div className={classes.control}>
                    <label htmlFor='alias'>Alias used to recognize the touchpoint template:</label>
                    <TextField id='outlined-basic' variant='outlined' inputRef={touchpointAlias} defaultValue={aliasDefaultValue} fullWidth />
                </div>
                <div className={classes.control}>
                    <label htmlFor='prompt'>Question prompted to user:</label>
                    <TextField id='outlined-basic' variant='outlined' inputRef={touchpointPrompt} defaultValue={promptDefaultValue} fullWidth />
                </div>
                <div className={classes.actions}>
                    <button>Save Template</button>
                </div>
            </form>
        </div>
    );
}
export default FFForm;