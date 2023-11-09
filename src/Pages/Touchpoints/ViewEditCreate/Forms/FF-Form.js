import { useRef } from 'react';
import TextField from '@mui/material/TextField';
import classes from './Form.module.css';
import { Link } from 'react-router-dom';
import {uid} from 'uid';
import {Button} from '@mui/material';

//Function ran to render the freeform touchpoint type creation form, and on data input, to 
//upload data to the realtime database and create a new touchpoint type. Or if already created, 
//it populates the form with the preexisting data and with edit/delete functionality.
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

        const touchpointValues = {
            UID: ((props.duplicate) ? uid() : ((props.view) ? props.arrayOfTemplates.UID:uid())),
            Alias: enteredAlias,
            Prompt: enteredPromptQuestion,
            Type: 'FF',
            TimesUsed: ((props.duplicate) ? 0 : ((props.view) ? props.arrayOfTemplates.TimesUsed:0)),
        };
        props.writeToDatabase(touchpointValues);
        window.location.href = '/Goldilocks-Suds-Website-Deploy/touchpoint-template-library';
    }

    return (
        <div>
            <h2 className={classes.h2}>{titleDefaultValue}</h2>
            <h3 className={classes.h3}>
                In this touchpoint type, the user will be prompted with an open-ended question.
                The user will respond with a short answer or paragraph.
            </h3>
            <br></br>
            <form className={classes.form}>
                <div className={classes.control}>
                    <label htmlFor='alias'>Touchpoint Template Name (or Alias):</label>
                    <label className={classes.label}>{duplicateAliasPrompt}</label>
                    <TextField id='outlined-basic' variant='outlined' inputRef={touchpointAlias} defaultValue={aliasDefaultValue} fullWidth />
                </div>
                <div className={classes.control}>
                    <label htmlFor='prompt'>Question displayed to user:</label>
                    <TextField id='outlined-basic' variant='outlined' inputRef={touchpointPrompt} defaultValue={promptDefaultValue} fullWidth />
                </div>
                <div className={classes.actions}>
                    <Link to='/Goldilocks-Suds-Website-Deploy/touchpoint-template-library'>
                        <Button sx={{ textTransform: 'none', '&:hover': { backgroundColor: '#000b9e', borderColor: '#000b9e' } }} variant="contained" size="large" onClick={SubmitHandler}>
                            Save Template
                        </Button>   
                    </Link>
                    <Link to='/Goldilocks-Suds-Website-Deploy/touchpoint-template-library'>
                        <Button sx={{textTransform:'none', '&:hover':{backgroundColor: '#000b9e', borderColor:'#000b9e'}}} variant="contained" size="large" onClick={SubmitHandler}>
                            Go Back 
                        </Button>   
                    </Link>
                    {deleteButtonHandler()}
                </div>
            </form>
        </div>
    );
}
export default FFForm;