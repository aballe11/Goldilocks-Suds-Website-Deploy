import _ from 'lodash';
import {React} from 'react';
import MediaTable from './MediaTable';

function MediaList(props){
      var arrayOfVideos = props.loadedVideos;
      var videoTableEnabledArray = [];
      for(let v in arrayOfVideos){
            const ID = v;
            const Title = _.get(arrayOfVideos[v], ['Title']);
            const Date = _.get(arrayOfVideos[v], ['Date_(D-M-Y)']);
            const Length = _.get(arrayOfVideos[v], ['Duration']);
            const Touchpoints = _.get(arrayOfVideos[v], ['TouchpointsAmt']);
            const Status = ((_.get(arrayOfVideos[v], ['Active']))? 'Active':'Inactive');
            
            videoTableEnabledArray.push({
                 'id': ID,
                 'Title': Title, 
                 'Upload Date': Date,
                 'Length': Length,
                 'Touchpoints': Touchpoints,
                 'State': Status,
                 'btn': '',
            }) 
      }

      return (
            <MediaTable arrayOfVideos = {arrayOfVideos} videoTableEnabledArray = {videoTableEnabledArray}/>
      );

}export default MediaList;