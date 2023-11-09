import { useRef } from 'react';
import classes from './Form.module.css';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import {uid} from 'uid';
import {Button} from '@mui/material';

//Function ran to render the 10-point rating touchpoint type creation form, and on data input, to 
//upload data to the realtime database and create a new touchpoint type. Or if already created, 
//it populates the form with the preexisting data and with edit/delete functionality.
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
    var titleDefaultValue = '5-Point Rating';

    if (props.view === true || props.duplicate ===true) {
        aliasDefaultValue = props.arrayOfTemplates.Alias;
        promptDefaultValue = props.arrayOfTemplates.Prompt;
        leftOptionDefaultValue = props.arrayOfTemplates.LeftOption;
        centerOptionDefaultValue = props.arrayOfTemplates.CenterOption;
        rightOptionDefaultValue = props.arrayOfTemplates.RightOption;
    }
    if(props.duplicate === true){
        titleDefaultValue = '5-Point Rating - Duplicate';
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
        const enteredLeftOption = touchpointLeftOption.current.value;
        const enteredCenterOption = touchpointCenterOption.current.value;
        const enteredRightOption = touchpointRightOption.current.value;

        const touchpointValues = {
            UID: ((props.duplicate) ? uid() : ((props.view) ? props.arrayOfTemplates.UID:uid())),
            Alias: enteredAlias,
            Prompt: enteredPromptQuestion,
            LeftOption: enteredLeftOption,
            CenterOption: enteredCenterOption,
            RightOption: enteredRightOption,
            Type: 'R5',
            TimesUsed: ((props.duplicate) ? 0 : ((props.view) ? props.arrayOfTemplates.TimesUsed:0)),
        };
        props.writeToDatabase(touchpointValues);
        window.location.href = '/Goldilocks-Suds-Website-Deploy/touchpoint-template-library';
    }



    return (
        <div>
            <h2 className={classes.h2}>{titleDefaultValue}</h2>
            <h3 className={classes.h3}>
                In this touchpoint, the user will be prompted a close ended question.
                The user will respond by selecting a point on a five-point Likert scale.
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
                <div className={classes.control}>
                    <label htmlFor='leftOption'>Left side point label (e.g. Strongly Disagree):</label>
                    <label>E.g. 'Completely Disagree':</label>
                    <TextField id='outlined-basic' variant='outlined' inputRef={touchpointLeftOption} defaultValue={leftOptionDefaultValue} fullWidth />
                </div>
                <div className={classes.control}>
                    <label htmlFor='centerOption'>Central point label (e.g. Neither agree nor disagree):</label>
                    <label>E.g. 'Neutral':</label>
                    <TextField id='outlined-basic' variant='outlined' inputRef={touchpointCenterOption} defaultValue={centerOptionDefaultValue} fullWidth />
                </div>
                <div className={classes.control}>
                    <label htmlFor='rightOption'>Right side point label (e.g. Strongly Agree):</label>
                    <label>E.g. 'Completely Agree':</label>
                    <TextField id='outlined-basic' variant='outlined' inputRef={touchpointRightOption} defaultValue={rightOptionDefaultValue} fullWidth />
                </div>
                <div className={classes.actions}>
                    <Link to='/Goldilocks-Suds-Website-Deploy/touchpoint-template-library'>
                        <Button sx={{textTransform:'none', '&:hover':{backgroundColor: '#000b9e', borderColor:'#000b9e'}}} variant="contained" size="large" onClick={SubmitHandler}>
                            Save Template
                        </Button>  
                    </Link>
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
export default R5Form;