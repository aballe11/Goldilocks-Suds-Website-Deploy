import { useRef } from 'react';
import { arrayOfTemplates } from '../../TPLibrary/TouchpointTable';
import classes from './Form.module.css';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

function MCIForm(props) {

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
            Type: 'MCI',
            TimesUsed: arrayOfTemplates.TimesUsed,
        };
        props.writeToDatabase(touchpointValues);
    }

    return (
        <div>
            <h2 className={classes.h2}>Multiple Choice w/ Images</h2>
            <h3 className={classes.h3}>
                In this touchpoint type, the user will be prompted an open-ended question and will be
                allowed to answer it by selecting from multiple images.
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
                    <button onClick={SubmitHandler}>Save Template</button>
                    <Link to='/touchpoints'>
                        <button>Go Back</button>
                    </Link>
                </div>
            </form>
            <div>
                <br></br><br></br><br></br><br></br>
                <h4>File submital code under construction...</h4>
            </div>
        </div>
    );
}
export default MCIForm;