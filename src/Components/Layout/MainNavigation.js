import {Link} from 'react-router-dom';
import classes from './MainNavigation.module.css';
import logo from '../Procter_&_Gamble_logo.svg';
import {Button} from '@mui/material';

//Function creates menu buttons and links them to their respective subpages.
function MainNavigation(){
    return (
        <header className={classes.header}>
            <Link to='/Goldilocks-Suds-Website-Deploy/'>
                <img src={logo} className= {classes.imgLogo} alt="logo"></img>
            </Link>
            <Link to='/Goldilocks-Suds-Website-Deploy/'>
                <div className={classes.logo}> 
                    Goldilocks Suds Aesthetics Research
                </div>
            </Link>
            <nav>
                {
                    //<ul> & <li> are creating an unordered list
                }
                <ul>
                    <li>
                        <Link to='/Goldilocks-Suds-Website-Deploy/touchpoint-template-library'> 
                            <Button variant="contained" size="medium" sx={{ color: 'info.main', backgroundColor: 'white', '&:hover':{color:'white'}, borderColor: 'info.main', width: '100'}}>
                                    Touchpoints 
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/Goldilocks-Suds-Website-Deploy/media'> 
                        <Button variant="contained" size="medium" sx={{ color: 'info.main',  backgroundColor: 'white', '&:hover':{color:'white'}, borderColor: 'info.main' }}>
                                    Media 
                            </Button>
                         </Link>
                    </li>
                    <li>
                        <Link to='/Goldilocks-Suds-Website-Deploy/user-data'> 
                            <Button variant="contained" size="medium" sx={{ color: 'info.main', backgroundColor: 'white', '&:hover':{color:'white'},  borderColor: 'info.main' }}>
                                    User Data 
                            </Button>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;