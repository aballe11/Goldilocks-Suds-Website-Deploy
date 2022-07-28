import {Link} from 'react-router-dom';
import classes from './MainNavigation.module.css';
import logo from '../Procter_&_Gamble_logo.svg';
import {Button} from '@mui/material';

function MainNavigation(){
    return (
        <header className={classes.header}>
            <img src={logo} className= {classes.imgLogo} alt="logo"></img>
            <div className={classes.logo}> 
                Goldilocks Suds Aesthetics Research
            </div>
            <nav>
                {
                    //<ul> & <li> are creating an unordered list
                }
                <ul>
                    <li>
                        <Link to='/touchpoints'> 
                            <Button variant="contained" size="medium" sx={{ color: 'info.main', backgroundColor: 'white', '&:hover':{color:'white'}, borderColor: 'info.main', width: '100'}}>
                                    Touchpoints 
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/media'> 
                        <Button variant="contained" size="medium" sx={{ color: 'info.main',  backgroundColor: 'white', '&:hover':{color:'white'}, borderColor: 'info.main' }}>
                                    Media 
                            </Button>
                         </Link>
                    </li>
                    <li>
                        <Link to='/user-data'> 
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