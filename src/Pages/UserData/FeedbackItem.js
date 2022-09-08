import classes from './FeedbackItem.module.css';
import Card from '../../Components/UI/Card';
import _ from 'lodash';

function FeedbackItem(props){
    

    var videoArray = props.videoArray;      
    var count = _.get(videoArray, 'Count');
    var listOfKeys = _.keys(videoArray);
    var dateCreated = _.get(videoArray, 'Date_(D-M-Y)');
    var totalResponses = _.get(videoArray, 'TotalResponses');
    const title = props.title;
    const id = props.id;
    listOfKeys = _.without(listOfKeys, 'Title', 'Count', 'Date_(D-M-Y)', 'TotalResponses');

    const tableColumns = [
        {
            title: 'Video Name',
            field: 'Video',
        },
        {
            title: 'Date Created',
            field: 'Date',
        }, 
        {
            title: 'Total Responses',
            field: 'Total',
            type: 'numeric'
        }, 
        {
            title: 'Status',
            field: 'Status',
        }, 
        {
            title: '',
            field: 'View Data',
        }
    ];

    //console.log('------------');
    //console.log(props.id);
    //console.log(props.title);
    //console.log(videoArray);
    //console.log(listOfKeys);
    //console.log(count);
    //console.log(dateCreated);
    //console.log(totalResponses)
    
    const finalRender = [];
    var touchpointTitle = '';

    function forLoopCollectingData(){
        for(let i = 1; i <= count; i++){
            touchpointTitle = 'Touchpoint ' + i  ;
        

        }
    }
    for(let i = 1; i <= count; i++){

    }

    return (
        <li className = {classes.item}> 
            <Card>
                <div className = {classes.content}>
                    <h1>  {title} </h1>
                </div>
                <div className = {classes.content}>
                    <h2>Touchpoint 1</h2>
                </div>
                <div className = {classes.content}>
                    <h3> Toggle 1:  </h3>
                </div>
                <div className = {classes.content}>
                    <h3> Toggle 2:  </h3>
                </div>
                <div className = {classes.content}>
                    <h3> Toggle 3:  </h3>
                </div>
                <div className = {classes.content}>
                    <h3> Toggle 4: </h3>
                </div>
                <div className = {classes.actions}>
                    <button /*onClick={}*/> Download Document </button>
                </div>
            </Card>
        </li>
    );
}

export default FeedbackItem;