import classes from './FeedbackTable2.module.css';
import _ from 'lodash';
import {Button} from '@mui/material';
import React, {useState} from 'react';
import { DataGrid, GridToolbar, GridColDef} from '@mui/x-data-grid';
import PieChart from './Charts/PieChart';
import BarChart from './Charts/BarChart';
import Wordcloud from './Charts/Wordcloud';

//Function handling data table changes going through the JSON information containing the user feedback gathered by the Unity App.
function FeedbackTable(props) {
      //######################### PREPARATION
      var arrayOfVideos = props.arrayOfVideos;
      var VideoTableEnabledArrayVideos = props.videoTableEnabledArray;    
      VideoTableEnabledArrayVideos = _.sortBy(VideoTableEnabledArrayVideos, ['Date', 'Title', 'Status'], ['asc', 'desc', 'desc']);

      var arrayOfTouchpoints = [];
      var tpTotal = '';
      var chosenVideoTitle = '';
      var chosenVideoAlias = '';
      var videoID = '';   
      var videoTableEnabledArrayTouchpoints = [];
  
      const [insideVideoTitle, setInsideVideoTitle] = useState('');
      const [exportButton, setExportButton] = useState('');
      const [goBackButton, setGoBackButton] = useState('');
      const [otherGoBackButton, setOtherGoBackButton] = useState('');
      const [touchpointTotal, setTouchpointTotal] = useState('')
      const [chart, setChart] = useState("");
      const [chart2, setChart2] = useState("");
      const [chart3, setChart3] = useState("");

      //Function to export table's information as a JSON.
      function exportAllTouchpoints(){
            const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
                JSON.stringify(arrayOfTouchpoints)
              )}`;
              const link = document.createElement("a");
              link.href = jsonString;
              link.download = (videoID + " _ User Feeedback Data.json");
          
              link.click();
      }    

      //######################### 1ST DATA TABLE - Videos

      const allVideosColumns: GridColDef[] = [
            { field: 'Title', headerName: 'Video Title', width: 300, headerAlign: 'center', align: 'center',},
            { field: 'Date', headerName: 'Date Created', width: 200, headerAlign: 'center', align: 'center',},
            { field: 'Responses', headerName: 'Total Responses', width: 226, headerAlign: 'center', align: 'center', type: 'number',},
            { field: 'Status', headerName: 'Status', headerAlign: 'center', align: 'center', width: 150,},
            { field: 'btn', headerName: 'Actions', renderCell: (params) => (
                    <strong > <Button sx={{textTransform:'none', '&:hover':{backgroundColor: '#000b9e', borderColor:'#000b9e'}}} variant="contained" size="small" onClick={()=>toVideoInformation(params)}> View </Button> </strong> ),
            width: 160, headerAlign: 'center', align: 'center', }, 
      ];


      const [dataGrid, setDataGrid] = useState(<DataGrid
            sx={{ border: 1, '& .MuiDataGrid-columnHeaders': { backgroundColor: 'rgba(49, 141, 247, 1)', color: 'rgba(255, 255, 255, 1)', fontSize: 16 },
                '&.MuiDataGrid-toolbarContainer': { padding: 200  }, '.MuiDataGrid-sortIcon': { color: 'rgba(255, 255, 255, 1)', } }}
            disableSelectionOnClick = {true}
            components={{ Toolbar: GridToolbar }}
            rows={VideoTableEnabledArrayVideos}
            disableDensitySelector
            columns={allVideosColumns}
            pageSize={20}
            rowsPerPageOptions={[20]}
      />); 

      //######################### 2ND DATA TABLE - Touchpoints inside a specific video

      const videoInformationColumns: GridColDef[] = [
            { field: 'id', headerName: 'ID', width: 125, headerAlign: 'center', align: 'center', },
            { field: 'Alias', headerName: 'Alias', width: 300, headerAlign: 'center', align: 'center', },
            { field: 'Type', headerName: 'Touchpoint Type', width: 275, headerAlign: 'center', align: 'center',},
            { field: 'Time', headerName: 'Time Shown', width: 150, headerAlign: 'center', align: 'center',},
            { field: 'btn', headerName: 'Actions', renderCell: (params) => ( <strong> <Button sx={{textTransform:'none', '&:hover':{backgroundColor: '#000b9e', borderColor:'#000b9e'}}} variant="contained" size="small" 
                onClick={()=>toTouchpointInformation(params)}> View </Button> </strong> ),
              width: 180, headerAlign: 'center', align: 'center', },         
         ];

      const toVideoInformation = (params) => {
            videoID = params.id;

            setExportButton(
                  <Button sx={{textTransform:'none', '&:hover':{backgroundColor: '#000b9e', borderColor:'#000b9e'}}} variant="contained" size="large" onClick={exportAllTouchpoints}>
                        Export All
                  </Button>
            );
            setGoBackButton(
                  <Button sx={{textTransform:'none', '&:hover':{backgroundColor: '#000b9e', borderColor:'#000b9e'}}} variant="contained" size="large" onClick={backToAllVideos}>
                        Go Back
                  </Button>
            );

            //Handling of new data array for the new data table.
            tpTotal = _.get(arrayOfVideos, [videoID, 'TotalResponses']);
            setTouchpointTotal('Total Responses: ' + tpTotal);
            chosenVideoAlias = _.get(arrayOfVideos, [videoID, 'Alias']);
            chosenVideoTitle = _.get(arrayOfVideos, [videoID, 'Title']);
            setInsideVideoTitle(chosenVideoTitle);

            arrayOfTouchpoints = [];
            videoTableEnabledArrayTouchpoints = [];
            arrayOfTouchpoints = _.get(arrayOfVideos, [videoID, 'Touchpoints']);

            for(let x in arrayOfTouchpoints){
                  const alias = arrayOfTouchpoints[x].Alias;
                  const total = arrayOfTouchpoints[x].Total;
                  const time = new Date(arrayOfTouchpoints[x].Time * 1000).toISOString().slice(14, 19);

                  var type = '';
                  
                
                  switch(arrayOfTouchpoints[x].Type){
                        case 'R10': type = '10-Point Rating'; 
                            break;
                        case 'R5': type =  '5-Point Rating';
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
                        'Alias': alias,
                        'Type': type,
                        'Time': time,
                        'id': x,
                  });
            }
            videoTableEnabledArrayTouchpoints = _.sortBy(videoTableEnabledArrayTouchpoints, ['Time', 'Type', 'Alias'], ['desc', 'asc', 'asc'])

            setDataGrid(<DataGrid
                  sx={{ border: 1, '& .MuiDataGrid-columnHeaders': { backgroundColor: 'rgba(49, 141, 247, 1)', color: 'rgba(255, 255, 255, 1)', fontSize: 16 },
                      '&.MuiDataGrid-toolbarContainer': { padding: 200 }, '.MuiDataGrid-sortIcon': { color: 'rgba(255, 255, 255, 1)', } }}
                  disableSelectionOnClick = {true}
                  components={{ Toolbar: GridToolbar }}
                  rows={videoTableEnabledArrayTouchpoints}
                  columns={videoInformationColumns}
                  disableDensitySelector
                  pageSize={20}
                  rowsPerPageOptions={[20]}
            />);
      }

       // ######################### BACK TO 1ST DATA TABLE
    
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
                  disableDensitySelector
                  pageSize={20}
                  rowsPerPageOptions={[20]}
              />); 
      }

      // ######################### 3RD DATA TABLE - Inside specific touchpoint

      const toTouchpointInformation = (params) => { 

            let id = params.id;
            setExportButton('');
            setGoBackButton('');
            setDataGrid("");
            var touchpointArray = _.get(arrayOfTouchpoints, params.id);
            //var touchpointDataArray = _.get(props.touchpointsData, params.id);

            switch(touchpointArray.Type){
                case "R10":
                case "MC":
                case "R5":
                case "MCI":

                    setOtherGoBackButton(<Button sx={{textTransform:'none', '&:hover':{backgroundColor: '#000b9e', borderColor:'#000b9e'}}} variant="contained" size="large" onClick={()=>backToVideoInformation(params)}>
                        Go Back
                    </Button>);
                    setGoBackButton('');
                    setChart(<div><BarChart tpId={id} touchpointArray={touchpointArray} touchpointDataArray={props.touchpointsData} alias={chosenVideoAlias} /> <br/></div>);
                    setChart2(<div><PieChart tpId={id} touchpointArray={touchpointArray} touchpointDataArray={props.touchpointsData} alias={chosenVideoAlias} /> <br/></div>);
                    break;
                case "FF":
                    setOtherGoBackButton(<Button sx={{textTransform:'none', '&:hover':{backgroundColor: '#000b9e', borderColor:'#000b9e'}}} variant="contained" size="large" onClick={()=>backToVideoInformation(params)}>
                        Go Back
                    </Button>);
                     setGoBackButton('');
                
                    var ffResponsesTableEnabledArray = [];
                    var wordcloudResponsesArray = [];
                    for(let x in touchpointArray.Responses){
                        ffResponsesTableEnabledArray.push({
                            id: x,
                            Email: touchpointArray.Responses[x].Email,
                            DateTime: touchpointArray.Responses[x].DateTime,
                            Response: touchpointArray.Responses[x].Response,
                        });

                        wordcloudResponsesArray.push(touchpointArray.Responses[x].Response);
                    }
                    
                    const FFcommentsColumns: GridColDef[] = [
                        { field: 'id', headerName: 'User ID', width: 280, headerAlign: 'center', align: 'center',},
                        { field: 'Email', headerName: 'User Email', width: 170, headerAlign: 'center', align: 'center',},
                        { field: 'DateTime', headerName: 'Date & Time', width: 170, headerAlign: 'center', align: 'center',},
                        { field: 'Response', headerName: 'Answer', width: 410, headerAlign: 'center', align: 'center',},
                    ];

                    setDataGrid(<DataGrid
                        sx={{
                            border: 1, '& .MuiDataGrid-columnHeaders': { backgroundColor: 'rgba(49, 141, 247, 1)', color: 'rgba(255, 255, 255, 1)', fontSize: 16 },
                            '&.MuiDataGrid-toolbarContainer': { padding: 200 },'.MuiDataGrid-sortIcon': { color: 'rgba(255, 255, 255, 1)', }, 
                            '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '15px' },
                        }}          
                        disableSelectionOnClick = {true}
                        components={{ Toolbar: GridToolbar }}
                        rows={ffResponsesTableEnabledArray}
                        columns={FFcommentsColumns}
                        pageSize={20}
                        disableDensitySelector
                        rowsPerPageOptions={[20]}
                        getRowHeight={()=> 'auto'}
                        getEstimatedRowHeight={() => 200}
                    />); 

                    setChart3(<div><h3>Word Cloud: </h3><br/><Wordcloud responsesArray = {wordcloudResponsesArray}/></div>);
                    break;
                default:
                    break;
            }
      }

      // ######################### BACK TO 2ND DATA BABLE

      const backToVideoInformation = (params) => {
            setChart("");
            setChart2("");
            setChart3("");
            setInsideVideoTitle(chosenVideoTitle);
            setOtherGoBackButton('');
            setExportButton(
                  <Button sx={{textTransform:'none', '&:hover':{backgroundColor: '#000b9e', borderColor:'#000b9e'}}} variant="contained" size="large" onClick={exportAllTouchpoints}>
                      Export All
                  </Button>
              );
              setGoBackButton(
                  <Button sx={{textTransform:'none', '&:hover':{backgroundColor: '#000b9e', borderColor:'#000b9e'}}} variant="contained" size="large" onClick={backToAllVideos}>
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
                  disableDensitySelector
                  getRowHeight={()=> 52}
                  rowsPerPageOptions={[20]}
                  getRowId={(row) => row.id}
              />);
      }

      return (
            <div className= {classes.div}>
              <br />
                <h1 className= {classes.h1}> User Data - Videos </h1>
                <h2 className= {classes.h2}> {insideVideoTitle}</h2>
                <h2 className= {classes.h2}> {touchpointTotal}</h2>
                <ul className = {classes.list}>
                    <div>
                        <br/>
                        {otherGoBackButton}
                        <br/>
                        {chart}
                        {chart2}
                    </div>
                    <div className = {classes.lowerDiv} >
                        {dataGrid}
                    </div>
                    <br/>
                    {chart3}
                    <div>
                        {exportButton} {goBackButton}
                    </div>
                </ul>
            </div>
        );
}export default FeedbackTable;