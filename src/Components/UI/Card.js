import classes from './Card.module.css';

function Card(props) {
    return (
        //With a wrapper function, all the wrapped content (as seen on AllMeetups), can be passed and shown or returned as props.children
        <div className = {classes.card}> {props.children} </div>
    );
}

export default Card;