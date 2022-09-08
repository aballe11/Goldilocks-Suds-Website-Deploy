import classes from './FeedbackTable2.module.css';
import _ from 'lodash';
import {Button} from '@mui/material';
import {React, useState} from 'react';
import { DataGrid, GridToolbar, GridColDef} from '@mui/x-data-grid';

function FeedbackTable2(props) {

      //###################################################################################### PREPARATION

      var arrayOfVideos = props.arrayOfVideos;
      var VideoTableEnabledArrayVideos = props.videoTableEnabledArray;    

      var arrayOfTouchpoints = [];
      var tpTotal = '';
      var chosenVideoTitle = '';
      var videoID = '';   
      var touchpointID = '';
      var videoTableEnabledArrayTouchpoints = [];
      var videoTableEnabledArrayTP = [];
  
      const [insideVideoTitle, setInsideVideoTitle] = useState('');
      const [exportButton, setExportButton] = useState('');
      const [goBackButton, setGoBackButton] = useState('');
      const [touchpointTotal, setTouchpointTotal] = useState('')


      function exportAllTouchpoints(){
            const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
                JSON.stringify(arrayOfTouchpoints)
              )}`;
              const link = document.createElement("a");
              link.href = jsonString;
              link.download = (videoID+" _ User Feeedback Data.json");
          
              link.click();
      }    

      //###################################################################################### 1ST STAGE

      const allVideosColumns: GridColDef[] = [
            { field: 'Title', headerName: 'Video Title', width: 300, headerAlign: 'center', align: 'center',},
            { field: 'Date', headerName: 'Date Created', width: 200, headerAlign: 'center', align: 'center',},
            { field: 'Responses', headerName: 'Total Responses', width: 226, headerAlign: 'center', align: 'center', type: 'number',},
            { field: 'Status', headerName: 'Status', headerAlign: 'center', align: 'center', width: 150,},
            { field: 'btn', headerName: 'Actions', renderCell: (params) => (
                    <strong > <Button variant="contained" size="small" onClick={()=>toVideoInformation(params)}> VIEW </Button> </strong> ),
            width: 160, headerAlign: 'center', align: 'center', }, 
      ];

      //var columnsArray = allVideosColumns;
      //var rowsArray = VideoTableEnabledArrayVideos;

      const [dataGrid, setDataGrid] = useState(<DataGrid
            sx={{ border: 1, '& .MuiDataGrid-columnHeaders': { backgroundColor: 'rgba(49, 141, 247, 1)', color: 'rgba(255, 255, 255, 1)', fontSize: 16 },
                '&.MuiDataGrid-toolbarContainer': { padding: 200  }, '.MuiDataGrid-sortIcon': { color: 'rgba(255, 255, 255, 1)', } }}
            disableSelectionOnClick = {true}
            components={{ Toolbar: GridToolbar }}
            rows={VideoTableEnabledArrayVideos}
            columns={allVideosColumns}
            pageSize={20}
            rowsPerPageOptions={[20]}
      />); 

      //###################################################################################### 2ND STAGE

      const videoInformationColumns: GridColDef[] = [
            { field: 'count', headerName: 'Touchpoint #', width: 150, headerAlign: 'center', align: 'center', },
            { field: 'Alias', headerName: 'Alias', width: 350, headerAlign: 'center', align: 'center', },
            { field: 'Type', headerName: 'Touchpoint Type', width: 350, headerAlign: 'center', align: 'center', /*type: 'number',*/ },
            { field: 'btn', headerName: 'Actions', renderCell: (params) => ( <strong> <Button variant="contained" size="small" 
                onClick={()=>toTouchpointInformation(params)}> VIEW </Button> </strong> ),
              width: 180, headerAlign: 'center', align: 'center', },         
         ];

      const toVideoInformation = (params) => {
            //console.log("VideoTableEnabledArrayVideos: ");
            //console.log(VideoTableEnabledArrayVideos);
            //console.log("ArraOfVideos: ");
            //console.log(arrayOfVideos);
            //console.log("Params: ");
            //console.log(params);

            videoID = params.id;

            setExportButton(
                  <Button variant="contained" size="large" onClick={exportAllTouchpoints}>
                        EXPORT ALL
                  </Button>
            );
            setGoBackButton(
                  <Button variant="contained" size="large" onClick={backToAllVideos}>
                        GO BACK
                  </Button>
            );

            //const count = _.get(arrayOfVideos, [videoID, 'Count']);

            tpTotal = _.get(arrayOfVideos, [videoID, 'TotalResponses']);
            setTouchpointTotal('Total Responses: ' + tpTotal);

            chosenVideoTitle = _.get(arrayOfVideos, [videoID, 'Title']);
            setInsideVideoTitle(chosenVideoTitle);

            arrayOfTouchpoints = [];
            videoTableEnabledArrayTouchpoints = [];
            arrayOfTouchpoints = _.get(arrayOfVideos, [videoID, 'Touchpoints']);
            //console.log(arrayOfTouchpoints);

            var count = 1;
            for(let x in arrayOfTouchpoints){
                  //console.log(arrayOfTouchpoints[x]);
                  //console.log(x);
                  const alias = arrayOfTouchpoints[x].Alias;
                  const total = arrayOfTouchpoints[x].Total;
                  var type = '';
                  

                  switch(arrayOfTouchpoints[x].Type){
                        case 'R10': type = '10-Based Rating'; 
                            break;
                        case 'R5': type =  '5-Based Rating';
                            break;
                        case 'MCI': type =  'Multiple Choice w/ Images';
                            break;
                        case 'MC': type =  'Multiple Choice'
                            break;
                        case 'FF': type =  'Freeform Input'
                            break; 
                        default:
                            break; 
                    }

                  videoTableEnabledArrayTouchpoints.push({
                        'count': count,
                        'Alias': alias,
                        'Type': type,
                        'id': x,
                  });
                  count++;
            }
            //console.log("Array of Touchpoints: ");
            //console.log(arrayOfTouchpoints);

            setDataGrid(<DataGrid
                  sx={{ border: 1, '& .MuiDataGrid-columnHeaders': { backgroundColor: 'rgba(49, 141, 247, 1)', color: 'rgba(255, 255, 255, 1)', fontSize: 16 },
                      '&.MuiDataGrid-toolbarContainer': { padding: 200 }, '.MuiDataGrid-sortIcon': { color: 'rgba(255, 255, 255, 1)', } }}
                  disableSelectionOnClick = {true}
                  components={{ Toolbar: GridToolbar }}
                  rows={videoTableEnabledArrayTouchpoints}
                  columns={videoInformationColumns}
                  pageSize={20}
                  rowsPerPageOptions={[20]}
            />);
      }

      //###################################################################################### 3RD STAGE
      
      const backToAllVideos = (params) => {
            setInsideVideoTitle('');
            setTouchpointTotal('');
            setExportButton('');
            setGoBackButton('');

            setDataGrid(<DataGrid
                  sx={{
                      border: 1, '& .MuiDataGrid-columnHeaders': { backgroundColor: 'rgba(49, 141, 247, 1)', color: 'rgba(255, 255, 255, 1)', fontSize: 16 },
                      '&.MuiDataGrid-toolbarContainer': { padding: 200 },'.MuiDataGrid-sortIcon': { color: 'rgba(255, 255, 255, 1)', } }}          
                  disableSelectionOnClick = {true}
                  components={{ Toolbar: GridToolbar }}
                  rows={VideoTableEnabledArrayVideos}
                  columns={allVideosColumns}
                  pageSize={20}
                  rowsPerPageOptions={[20]}
              />); 
      }
      
      const touchpointInformationColumns: GridColDef[] = [
            {field: 'descriptor', headerName: 'Answer Descriptor', width: 346, headerAlign: 'center', align: 'center'},
            {field: 'value', headerName: 'Answers', width: 345, headerAlign: 'center', align: 'center'},
            {field: 'percentage', headerName: 'Percentage', width: 345, headerAlign: 'center', align: 'center'},
      ];

      const toTouchpointInformation = (params) => {
            setGoBackButton(<Button variant="contained" size="large" onClick={()=>backToVideoInformation(params)}>
                              Go Back
                        </Button>);
            setExportButton('');
            //console.log(params);
            //console.log(arrayOfTouchpoints);
            //console.log(touchpointID);

            var touchpointArray = _.get(arrayOfTouchpoints, params.id);
            //const tpID = params.id - 1;
            videoTableEnabledArrayTP = [];
            var videoTableEnabledArrayTPunsorted = [];
            //console.log(touchpointArray);
            const tpTotal = touchpointArray.Total;
            const tpAlias = touchpointArray.Alias;
            const tpType = touchpointArray.Type;


            setInsideVideoTitle(chosenVideoTitle + ' | ' + tpAlias + ' | ' + tpType);
            setTouchpointTotal('Total Responses: ' + tpTotal);

            touchpointArray = _.omit(touchpointArray, ['Alias', /*'Title',*/ 'Total', /*'id',*/ 'Type']);
            //console.log(touchpointArray);

            switch(tpType){
                  case 'R10':
                  case 'R5':
                  case 'MC':

                        for(let answer in touchpointArray){
                              var descriptor = ((answer).split('_'));
                              var number = descriptor[2];
                              descriptor = _.slice(descriptor, 0, 2);
                              descriptor = _.join(descriptor, ' ');
                              var value = _.parseInt(touchpointArray[answer]);
                              var percentage = 0;
                              if(tpTotal !== 0){
                                    percentage = (_.round(( (value/tpTotal) * 100), 2));
                              }  
                              percentage = percentage + '%';
            
                              videoTableEnabledArrayTPunsorted.push({
                                    'descriptor': descriptor,
                                    'value': value,
                                    'percentage': percentage,
                                    'id': number,
                              });
                              
                        }
                        //console.log(videoTableEnabledArrayTPunsorted);
                        
                        for(let i = 0; i <= videoTableEnabledArrayTPunsorted.length; i++){
                              for(let x in videoTableEnabledArrayTPunsorted){
                                    if(videoTableEnabledArrayTPunsorted[x].id == i+1){
                                          videoTableEnabledArrayTP.push(videoTableEnabledArrayTPunsorted[x]);
                                    }
                              }
                        }    
                        //console.log(videoTableEnabledArrayTP);



                        break;
                  case 'MCI':
                  case 'FF':
                        var count4 = 1;
                        for(let answer in touchpointArray){
                              var value = _.parseInt(touchpointArray[answer]);
                              var percentage = 0;
                              if(tpTotal !== 0){
                                    percentage = (_.round(( (value/tpTotal) * 100), 2));
                              }  
                              percentage = percentage + '%';
            
                              videoTableEnabledArrayTP.push({
                                    'descriptor': answer,
                                    'value': value,
                                    'percentage': percentage,
                                    'id': count4,
                              });
                              count4++;
                              
                        }
                        break;
                  default:
                      break; 
              }

            //console.log(videoTableEnabledArrayTP);

            setDataGrid(<DataGrid
                  sx={{ border: 1, '& .MuiDataGrid-columnHeaders': { backgroundColor: 'rgba(49, 141, 247, 1)', color: 'rgba(255, 255, 255, 1)', fontSize: 16 },
                      '&.MuiDataGrid-toolbarContainer': { padding: 200 }, '.MuiDataGrid-sortIcon': { color: 'rgba(255, 255, 255, 1)', } }}
                  disableSelectionOnClick = {true}
                  components={{ Toolbar: GridToolbar }}
                  rows={videoTableEnabledArrayTP}
                  columns={touchpointInformationColumns}
                  pageSize={20}
                  rowsPerPageOptions={[20]}
            />);
      }


      //###################################################################################### BACK TO 2ND STAGE

      const backToVideoInformation = (params) => {
            setInsideVideoTitle(chosenVideoTitle);
            setExportButton(
                  <Button variant="contained" size="large" onClick={exportAllTouchpoints}>
                      Export All
                  </Button>
              );
              setGoBackButton(
                  <Button variant="contained" size="large" onClick={backToAllVideos}>
                      Go Back
                  </Button>
              );
              setDataGrid(<DataGrid
                  sx={{ border: 1, '& .MuiDataGrid-columnHeaders': { backgroundColor: 'rgba(49, 141, 247, 1)', color: 'rgba(255, 255, 255, 1)', fontSize: 16 },
                      '&.MuiDataGrid-toolbarContainer': { padding: 200 }, '.MuiDataGrid-sortIcon': { color: 'rgba(255, 255, 255, 1)', } }}
                  disableSelectionOnClick = {true}
                  components={{ Toolbar: GridToolbar }}
                  rows={videoTableEnabledArrayTouchpoints}
                  columns={videoInformationColumns}
                  pageSize={20}
                  rowsPerPageOptions={[20]}
                  getRowId={(row) => row.id}
              />);
      }



      return (
            <div className= {classes.div}>
                <br/>
                <h1 className= {classes.h1}> User Data - Videos </h1>
                <h2 className= {classes.h2}> {insideVideoTitle}</h2>
                <h2 className= {classes.h2}> {touchpointTotal}</h2>
                <ul className = {classes.list}>
                    <div className = {classes.lowerDiv} >
                        {dataGrid}
                    </div>
                    <div>
                        {exportButton} {goBackButton}
                    </div>
                </ul>
            </div>
        );
}export default FeedbackTable2;