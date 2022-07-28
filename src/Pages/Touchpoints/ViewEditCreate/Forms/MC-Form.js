import { useRef } from 'react';
import { arrayOfTemplates } from '../../TPLibrary/TouchpointTable';
import classes from './Form.module.css';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

function MCForm(props) {

    const touchpointAlias = useRef();
    const touchpointPrompt = useRef();
    const touchpointOption1 = useRef();
    const touchpointOption2 = useRef();
    const touchpointOption3 = useRef();
    const touchpointOption4 = useRef();

    var aliasDefaultValue = '';
    var promptDefaultValue = '';
    var option1DefaultValue = '';
    var option2DefaultValue = '';
    var option3DefaultValue = '';
    var option4DefaultValue = '';

    if (props.arrayOfTemplates !== undefined) {
        aliasDefaultValue = props.arrayOfTemplates.Alias;
        promptDefaultValue = props.arrayOfTemplates.Prompt;
        option1DefaultValue = props.arrayOfTemplates.Option1;
        option2DefaultValue = props.arrayOfTemplates.Option2;
        option3DefaultValue = props.arrayOfTemplates.Option3;
        option4DefaultValue = props.arrayOfTemplates.Option4;
    }

    function SubmitHandler(event) {
        event.preventDefault();

        const enteredAlias = touchpointAlias.current.value;
        const enteredPromptQuestion = touchpointPrompt.current.value;
        const enteredOption1 = touchpointOption1.current.value;
        const enteredOption2 = touchpointOption2.current.value;
        const enteredOption3 = touchpointOption3.current.value;
        const enteredOption4 = touchpointOption4.current.value;

        const touchpointValues = {
            Alias: enteredAlias,
            Prompt: enteredPromptQuestion,
            Option1: enteredOption1,
            Option2: enteredOption2,
            Option3: enteredOption3,
            Option4: enteredOption4,
            Type: 'MC',
            TimesUsed: arrayOfTemplates.TimesUsed,
        };
        props.writeToDatabase(touchpointValues);
    }

    return (
        <div>
            <h2 className={classes.h2}>Multiple Choice</h2>
            <h3 className={classes.h3}>
                In this touchpoint type, the user will be prompted a close-ended question,
                and will be given 4 answer options to choose from.
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
                <div className={classes.control}>
                    <label htmlFor='option1'>Option 1:</label>
                    <TextField id='outlined-basic' variant='outlined' inputRef={touchpointOption1} defaultValue={option1DefaultValue} fullWidth />
                </div>
                <div className={classes.control}>
                    <label htmlFor='option2'>Option 2:</label>
                    <TextField id='outlined-basic' variant='outlined' inputRef={touchpointOption2} defaultValue={option2DefaultValue} fullWidth />
                </div>
                <div className={classes.control}>
                    <label htmlFor='option3'>Option 3:</label>
                    <TextField id='outlined-basic' variant='outlined' inputRef={touchpointOption3} defaultValue={option3DefaultValue} fullWidth />
                </div>
                <div className={classes.control}>
                    <label htmlFor='option4'>Option 4:</label>
                    <TextField id='outlined-basic' variant='outlined' inputRef={touchpointOption4} defaultValue={option4DefaultValue} fullWidth />
                </div>
                <div className={classes.actions}>
                    <button onClick={SubmitHandler}>Save Template</button>
                    <Link to='/touchpoints'>
                        <button>Go Back</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}
export default MCForm;