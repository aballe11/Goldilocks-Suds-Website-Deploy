import FeedbackTable from './FeedbackTable';
import _ from 'lodash';

//
function FeedbackList(props){
    var idArray = props.IDs.split('/');
    var arrayOfVideos = (props.videosFeedack);

    const videoTableEnabledArray = [];
    for(const v of idArray){
        const title = _.get(arrayOfVideos, [v, 'Title']);
        const date = _.get(arrayOfVideos, [v, 'Date_(D-M-Y)']);
        const totalResponses = _.get(arrayOfVideos, [v, 'TotalResponses']);
        const status = (_.get(arrayOfVideos, [v, 'Active'])? 'Active':'Inactive');
        const alias = _.get(arrayOfVideos, [v, 'Alias']);

        videoTableEnabledArray.push({
            'id': v,
            'Title': title,
            'Date': date,
            'Responses': totalResponses,
            'Status': status,
        })
    }
    return (    
        <FeedbackTable videoTableEnabledArray = {videoTableEnabledArray} arrayOfVideos = {arrayOfVideos} />
    );          
}

export default FeedbackList;