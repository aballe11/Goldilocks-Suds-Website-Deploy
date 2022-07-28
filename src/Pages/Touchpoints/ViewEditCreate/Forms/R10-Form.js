import { useRef } from 'react';
import classes from './Form.module.css';
import TextField from '@mui/material/TextField';
import { arrayOfTemplates } from '../../TPLibrary/TouchpointTable';
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


    if (props.arrayOfTemplates !== undefined) {
        aliasDefaultValue = props.arrayOfTemplates.Alias;
        promptDefaultValue = props.arrayOfTemplates.Prompt;
        minimumOptionDefaultValue = props.arrayOfTemplates.MinimumOption;
        maximumOptionDefaultValue = props.arrayOfTemplates.MaximumOption;
    }


    function SubmitHandler(event) {
        event.preventDefault();

        const enteredAlias = touchpointAlias.current.value;
        const enteredPromptQuestion = touchpointPrompt.current.value;
        const enteredMaximumOption = touchpointMaximumOption.current.value;
        const enteredMinimumOption = touchpointMinimumOption.current.value;

        const touchpointValues = {
            Alias: enteredAlias,
            Prompt: enteredPromptQuestion,
            MaximumOption: enteredMaximumOption,
            MinimumOption: enteredMinimumOption,
            Type: 'R10',
            TimesUsed: arrayOfTemplates.TimesUsed,
        };
        props.writeToDatabase(touchpointValues);
    }

    return (
        <div>
            <h2 className={classes.h2}>10-Based Rating</h2>
            <h3 className={classes.h3}>
                In this touchpoint type, the user will be prompted a close ended question,
                and will be allowed to evaluate it in a 1 to 10 rating scale.
            </h3>
            <br></br>
            <form className={classes.form} /*onSubmit = {SummitHandler}*/>
                <div className={classes.control}>
                    <label htmlFor='alias'>Alias used to recognize the touchpoint template:</label>
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
                    <Link to='/touchpoints'>
                        <button>Go Back</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}
export default R10Form;