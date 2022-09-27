import classes from './Layout.module.css';
import MainNavigation from './MainNavigation';

//Function handling layout of general menu.
function Layout(props){
    return (
        <div>
            <MainNavigation />
            <main className = {classes.main}>
                {props.children}
            </main>
        </div>
    );
}
export default Layout;