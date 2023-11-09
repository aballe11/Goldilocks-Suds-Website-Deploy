import { useRef } from 'react';
import classes from './Form.module.css';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import {uid} from 'uid';
import {Button} from '@mui/material';

//Function ran to render the multiple choice touchpoint type creation form, and on data input, to 
//upload data to the realtime database and create a new touchpoint type. Or if already created, 
//it populates the form with the preexisting data and with edit/delete functionality.
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
    var duplicateAliasPrompt = '';
    var titleDefaultValue = 'Multiple Choice';

    if (props.view === true || props.duplicate ===true) {
        aliasDefaultValue = props.arrayOfTemplates.Alias;
        promptDefaultValue = props.arrayOfTemplates.Prompt;
        option1DefaultValue = props.arrayOfTemplates.Option1;
        option2DefaultValue = props.arrayOfTemplates.Option2;
        option3DefaultValue = props.arrayOfTemplates.Option3;
        option4DefaultValue = props.arrayOfTemplates.Option4;
    }

    if(props.duplicate === true){
        titleDefaultValue = 'Multiple Choice - Duplicate';
        duplicateAliasPrompt = '(Make sure to change the duplicate\'s alias!)';
    }

    function deleteTemplate(){
        props.deleteFromDatabase(props.arrayOfTemplates.UID);
    }

    function deleteButtonHandler(){
        if(props.view){
            return (<Link to = '/Goldilocks-Suds-Website-Deploy/touchpoint-template-library'>
                <Button sx={{textTransform:'none', '&:hover':{backgroundColor: '#000b9e', borderColor:'#000b9e'}}} variant="contained" size="large" onClick={deleteTemplate}>
                    Delete Template 
                </Button>   
            </Link>);
        }
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
            UID: ((props.duplicate) ? uid() : ((props.view) ? props.arrayOfTemplates.UID:uid())),
            Alias: enteredAlias,
            Prompt: enteredPromptQuestion,
            Option1: enteredOption1,
            Option2: enteredOption2,
            Option3: enteredOption3,
            Option4: enteredOption4,
            Type: 'MC',
            TimesUsed: ((props.duplicate) ? 0 : ((props.view) ? props.arrayOfTemplates.TimesUsed:0)),
        };
        props.writeToDatabase(touchpointValues);
        window.location.href = '/Goldilocks-Suds-Website-Deploy/touchpoint-template-library';
    }

    return (
        <div>
            <h2 className={classes.h2}>{titleDefaultValue}</h2>
            <h3 className={classes.h3}>
                In this touchpoint type, the user will be prompted with a close-ended question. The user can select from four answer options.
            </h3>
            <br></br>
            <form className={classes.form}>
                <div className={classes.control}>
                    <label htmlFor='alias'>Touchpoint Template Name (or Alias): </label>
                    <label className={classes.label}>{duplicateAliasPrompt}</label>
                    <TextField id='outlined-basic' variant='outlined' inputRef={touchpointAlias} defaultValue={aliasDefaultValue} fullWidth />
                </div>
                <div className={classes.control}>
                    <label htmlFor='prompt'>Question displayed to user:</label>
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
                        <Button sx={{ textTransform: 'none', '&:hover': { backgroundColor: '#000b9e', borderColor: '#000b9e' } }} variant="contained" size="large" onClick={SubmitHandler}>
                            Save Template
                        </Button>   
                    <Link to='/Goldilocks-Suds-Website-Deploy/touchpoint-template-library'>
                        <Button sx={{textTransform:'none', '&:hover':{backgroundColor: '#000b9e', borderColor:'#000b9e'}}} variant="contained" size="large">
                            Go Back 
                        </Button>   
                    </Link>
                    {deleteButtonHandler()}
                </div>
            </form>
        </div>
    );
}
export default MCForm;