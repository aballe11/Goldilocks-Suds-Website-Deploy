import { Link } from 'react-router-dom';
import { db } from '../Firebase';
import { set, ref } from 'firebase/database';
import classes from './Touchpoints.module.css';
import { uid } from 'uid'

function Touchpoints() {
const writeToDatabase = () => {
        //set(ref(db, 'Feedback/Chest_Dawn/10'), more);

        //WRITING TOUCHPOINT FEEDBACK INFORMATION
        const uuid = uid();
        set(ref(db, 'Feedback/1904715a11a'), {
            'Tp1':{
                    Total: 0, Type: 'R10', 'Toggle_1': 0, 'Toggle_2': 0, 'Toggle_3': 0,
                    'Toggle_4': 0, 'Toggle_5': 0, 'Toggle_6': 0, 'Toggle_7': 0, 'Toggle_8': 0,
                    'Toggle_9': 0, 'Toggle_10': 0, Alias: 'Suds Quality Rating',  
                },
            'Tp2':{
                    Total: 0, Type: 'R5', 'Toggle_-2': 0, 'Toggle_-1': 0,
                    'Toggle_0': 0, 'Toggle_1': 0, 'Toggle_2': 0, Alias: 'Suds Quantity Rating',
                },
            'Tp3':{
                    Total: 0, Type: 'MCI', Airy: 0, Creamy: 0, Dense: 0,
                    Dingy: 0, Dull: 0, Fluffy: 0, Lasting: 0, Loose: 0,
                    'None of the Above': 0, Runny: 0, Shiny: 0, Smeary: 0,
                    Soft: 0, Spreadable: 0, Strong: 0, Thick: 0, Thin: 0,
                    Watery: 0, Weak: 0, White: 0, Alias: 'Suds Description w/ Images',
                },
            'Tp4':{
                    Total: 0, Type: 'R10', 'Toggle_1': 0, 'Toggle_2': 0, 'Toggle_3': 0,
                    'Toggle_4': 0, 'Toggle_5': 0, 'Toggle_6': 0, 'Toggle_7': 0, 'Toggle_8': 0,
                    'Toggle_9': 0, 'Toggle_10': 0, Alias: 'Suds Quality Rating',    
                },
            'Tp5':{
                    Total: 0, Type: 'R5', 'Toggle_-2': 0, 'Toggle_-1': 0,
                    'Toggle_0': 0, 'Toggle_1': 0, 'Toggle_2': 0, Alias: 'Suds Quantity Rating',
                },
            'Tp6':{
                    Total  : 0, Type: 'MCI', Airy: 0, Creamy: 0, Dense: 0,
                    Dingy: 0, Dull: 0, Fluffy: 0, Lasting: 0, Loose: 0,
                    'None of the Above': 0, Runny: 0, Shiny: 0, Smeary: 0,
                    Soft: 0, Spreadable: 0, Strong: 0, Thick: 0, Thin: 0,
                    Watery: 0, Weak: 0, White: 0, Alias: 'Suds Description w/ Images',
                },
            'Tp7':{
                    Total: 0, Type: 'R10', 'Toggle_1': 0, 'Toggle_2': 0, 'Toggle_3': 0,
                    'Toggle_4': 0, 'Toggle_5': 0, 'Toggle_6': 0, 'Toggle_7': 0, 'Toggle_8': 0,
                    'Toggle_9': 0, 'Toggle_10': 0, Alias: 'Suds Quality Rating',    
                },
            'Tp8':{
                    Total: 0, Type: 'R5', 'Toggle_-2': 0, 'Toggle_-1': 0,
                    'Toggle_0': 0, 'Toggle_1': 0, 'Toggle_2': 0, Alias: 'Suds Quantity Rating',
                },
            'Tp9':{
                    Total: 0, Type: 'MCI', Airy: 0, Creamy: 0, Dense: 0,
                    Dingy: 0, Dull: 0, Fluffy: 0, Lasting: 0, Loose: 0,
                    'None of the Above': 0, Runny: 0, Shiny: 0, Smeary: 0,
                    Soft: 0, Spreadable: 0, Strong: 0, Thick: 0, Thin: 0,
                    Watery: 0, Weak: 0, White: 0, Alias: 'Suds Description w/ Images',
                },
            Count: 9,
            Title: 'Bad Guy - Chest POV - 1',
            'Date_(D-M-Y)': '14-05-2022',
            Status: 'Active',
            TotalResponses: 0,
            Count: 9,
        });

        //WRITING VIDEO INFORMATION
        /*const uuid = uid();
        set(ref(db, `Videos/${uuid}`), {
            Alias: 'Chest_Dawn_1',
            ID: uuid,
            Resolution: '5K',
            Duration: 42,
            Title: 'Dawn - Chest POV - 1',
            Type: '180',
            VideoIndex: 1,
            Touchpoints: {
                '1': {
                        MaximumOption: 'Ideal',
                        MinimumOption: 'Not Ideal',
                        Prompt: 'How would you rate the quality of the suds?',
                        Time: 15,
                        Type: 'R10'
                    },
                '2': {
                        LeftOption: 'A lot less than I would like.',
                        CenterOption: 'Just the right amount.',
                        RightOption: 'A lot more than I would like.',
                        Prompt: 'How would you rate the quantity of the suds?',
                        Time: 15,
                        Type: 'R5'
                    },
                '3': {
                        Prompt: 'How would you describe the suds?',
                        Time: 15,
                        Type: 'MCI'
                    },
                '4': {
                        MaximumOption: 'Ideal',
                        MinimumOption: 'Not Ideal',
                        Prompt: 'How would you rate the quality of the suds?',
                        Time: 21,
                        Type: 'R10'
                    },
                '5': {
                        LeftOption: 'A lot less than I would like.',
                        CenterOption: 'Just the right amount.',
                        RightOption: 'A lot more than I would like.',
                        Prompt: 'How would you rate the quantity of the suds?',
                        Time: 21,
                        Type: 'R5'
                    },
                '6': {
                        Prompt: 'How would you describe the suds?',
                        Time: 21,
                        Type: 'MCI'
                    },
                '7': {
                        MaximumOption: 'Ideal',
                        MinimumOption: 'Not Ideal',
                        Prompt: 'How would you rate the quality of the suds?',
                        Time: 35,
                        Type: 'R10'
                    },
                '8': {
                        LeftOption: 'A lot less than I would like.',
                        CenterOption: 'Just the right amount.',
                        RightOption: 'A lot more than I would like.',
                        Prompt: 'How would you rate the quantity of the suds?',
                        Time: 35,
                        Type: 'R5'
                    },
                '9': {
                        Prompt: 'How would you describe the suds?',
                        Time: 35,
                        Type: 'MCI'
                    },

            },
        });
        */ 
    }

    return (
        <div>
            <br></br><br></br><br></br><br></br><br></br>
            <div>
                <Link to='/touchpoints/touchpoint-template-library'>
                    <button className={classes.btn}>Touchpoint Library</button>
                </Link>
            </div>
            <div>
                <Link to='/touchpoints/create-new'>
                    <button className={classes.btn} /*onClick={writeToDatabase}*/>Create Touchpoint</button>
                </Link>
            </div>
        </div>
    );
    

    
};
export default Touchpoints;