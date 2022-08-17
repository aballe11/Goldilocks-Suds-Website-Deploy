import classes from './FeedbackTable.module.css';
import _ from 'lodash';
import {Button} from '@mui/material';
import {React, useState} from 'react';
import { DataGrid, GridToolbar, GridColDef} from '@mui/x-data-grid';

function FeedbackTable(props){
    var arrayOfVideos = props.arrayOfVideos;
    var videoTableEnabledArray = props.videoTableEnabledArray;    
    var arrayOfTouchpoints = [];
    var tpTotal = '';
    var chosenVideoTitle = '';
    var videoID = '';   

    const [insideVideoTitle, setInsideVideoTitle] = useState('');
    const [exportButton, setExportButton] = useState('');
    const [goBackButton, setGoBackButton] = useState('');
    const [touchpointTotal, setTouchpointTotal] = useState('')

    const allVideosColumns: GridColDef[] = [
        { field: 'Title', headerName: 'Video Title', width: 300, headerAlign: 'center', align: 'left',},
        { field: 'Date', headerName: 'Date Created', width: 200, headerAlign: 'center', align: 'center',},
        { field: 'Responses', headerName: 'Total Responses', width: 226, headerAlign: 'center', align: 'center', type: 'number',},
        { field: 'Status', headerName: 'Status', headerAlign: 'center', align: 'center', width: 150,},
        { field: 'btn', headerName: 'Actions', renderCell: (params) => (
                <strong > <Button variant="contained" size="small" onClick={()=>toVideoInformation(params)}> VIEW </Button> </strong> ),
        width: 160, headerAlign: 'center', align: 'center', }, 
    ];

    const videoInformationColumns: GridColDef[] = [
        { field: 'id', headerName: 'Touchpoint #', width: 150, headerAlign: 'center', align: 'center', },
        { field: 'Alias', headerName: 'Alias', width: 300, headerAlign: 'center', align: 'center', },
        { field: 'Type', headerName: 'Touchpoint Type', width: 300, headerAlign: 'center', align: 'center', type: 'number', },
        { field: 'btn', headerName: 'Actions', renderCell: (params) => ( <strong> <Button variant="contained" size="small" 
            onClick={()=>toTouchpointInformation(params)}> VIEW </Button> </strong> ),
          width: 280, headerAlign: 'center', align: 'center', },         
     ];

     const touchpointInformationColumns: GridColDef[] = [
        {field: 'descriptor', headerName: 'Answer Descriptor', width: 346, headerAlign: 'center', align: 'center'},
        {field: 'value', headerName: 'Answers', width: 345, headerAlign: 'center', align: 'center'},
        {field: 'percentage', headerName: 'Percentage', width: 345, headerAlign: 'center', align: 'center'},
    ];
    
    function exportAllTouchpoints(){
        console.log('--------');
        
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(arrayOfTouchpoints)
          )}`;
          const link = document.createElement("a");
          link.href = jsonString;
          link.download = (videoID+" _ User Feeedback Data.json");
      
          link.click();
    }    
    const toTouchpointInformation = (params) => {
        setGoBackButton(<Button variant="contained" size="large" onClick={()=>backToVideoInformation(params)}>
                            Go Back
                        </Button>);
        setExportButton('');
        const tpID = params.id;
        //console.log(tpID);
        //console.log(arrayOfTouchpoints)
        var touchpointArray = _.get(arrayOfTouchpoints, [tpID-1]);
        //console.log(touchpointArray);
        var tpTotal = touchpointArray.Total;
        var optionsArray = []
        var x = 1;

        setInsideVideoTitle(chosenVideoTitle + ' | ' + touchpointArray.Alias + ' | ' + touchpointArray.Type);
        setTouchpointTotal('Total Responses: ' + tpTotal);
        tpTotal = _.parseInt(tpTotal);

        touchpointArray = _.omit(touchpointArray, ['Alias', 'Title', 'Total', 'id', 'Type']);

        for(let key in touchpointArray){
            var descriptor = (key).split('_');
            descriptor = _.join(descriptor, ' ');

            var value = _.parseInt(touchpointArray[key]);
            var percentage = 0;

            if(tpTotal !== 0){
                percentage = (_.round(( (value/tpTotal) * 100), 2));
            }            

            var option = {
                'descriptor': descriptor,
                'value': value,
                'percentage': (percentage + '%'),
                'id': x,
            }
            optionsArray.push(option);
            x++;
        }
        //console.log(optionsArray);
        //console.log('--------');
        
        setDataGrid(<DataGrid
            sx={{ border: 1, '& .MuiDataGrid-columnHeaders': { backgroundColor: 'rgba(49, 141, 247, 1)', color: 'rgba(255, 255, 255, 1)', fontSize: 16 },
                '&.MuiDataGrid-toolbarContainer': { padding: 200 }, '.MuiDataGrid-sortIcon': { color: 'rgba(255, 255, 255, 1)', } }}
            disableSelectionOnClick = {true}
            components={{ Toolbar: GridToolbar }}
            rows={optionsArray}
            columns={touchpointInformationColumns}
            pageSize={20}
            rowsPerPageOptions={[20]}
        />);
        //console.log(optionsArray);
    }

    const backToVideoInformation = () => {
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
        console.log(arrayOfTouchpoints);
        setDataGrid(<DataGrid
            sx={{ border: 1, '& .MuiDataGrid-columnHeaders': { backgroundColor: 'rgba(49, 141, 247, 1)', color: 'rgba(255, 255, 255, 1)', fontSize: 16 },
                '&.MuiDataGrid-toolbarContainer': { padding: 200 }, '.MuiDataGrid-sortIcon': { color: 'rgba(255, 255, 255, 1)', } }}
            disableSelectionOnClick = {true}
            components={{ Toolbar: GridToolbar }}
            rows={arrayOfTouchpoints}
            columns={videoInformationColumns}
            pageSize={20}
            rowsPerPageOptions={[20]}
            getRowId={(row) => row.id}
        />);
    }

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
            rows={rowsArray}
            columns={columnsArray}
            pageSize={20}
            rowsPerPageOptions={[20]}
    />); }

    const toVideoInformation = (params) => {
        videoID = params.id;
        //console.log(_.get(arrayOfVideos.videoID, videoID));
        const count = _.get(arrayOfVideos, [videoID, 'Count']);
        chosenVideoTitle = _.get(arrayOfVideos, [videoID, 'Title']);
        tpTotal = _.get(arrayOfVideos, [videoID, 'TotalResponses']);

        setInsideVideoTitle(chosenVideoTitle);
        setTouchpointTotal('Total Responses: ' + tpTotal);
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
        arrayOfTouchpoints = [];
        var touchPoints
        for(let i = 1; i <= count; i++){
            touchPoints = _.get(arrayOfVideos, [videoID, ('Tp'+i)]);
            //console.log(touchPoints);
            touchPoints.id = i;

            switch(touchPoints.Type){
                case 'R10': touchPoints.Type = '10-Based Rating'; 
                    break;
                case 'R5': touchPoints.Type = '5-Based Rating';
                    break;
                case 'MCI': touchPoints.Type = 'Multiple Choice w/ Images';
                    break;
                case 'MC': touchPoints.Type = 'Multiple Choice'
                    break;
                case 'FF': touchPoints.Type = 'Freeform Input'
                    break; 
                default:
                    break; }
           // touchPoints['btn'] = '';
            //console.log(touchPoints);
            arrayOfTouchpoints.push(touchPoints);
        } 
        console.log(arrayOfTouchpoints);
        //console.log(arrayOfTouchpoints);

        setDataGrid(<DataGrid
            sx={{ border: 1, '& .MuiDataGrid-columnHeaders': { backgroundColor: 'rgba(49, 141, 247, 1)', color: 'rgba(255, 255, 255, 1)', fontSize: 16 },
                '&.MuiDataGrid-toolbarContainer': { padding: 200 }, '.MuiDataGrid-sortIcon': { color: 'rgba(255, 255, 255, 1)', } }}
            disableSelectionOnClick = {true}
            components={{ Toolbar: GridToolbar }}
            rows={arrayOfTouchpoints}
            columns={videoInformationColumns}
            pageSize={20}
            rowsPerPageOptions={[20]}
        />);

    }
    var columnsArray = allVideosColumns;
    var rowsArray = videoTableEnabledArray;
    const [dataGrid, setDataGrid] = useState(<DataGrid
        sx={{ border: 1, '& .MuiDataGrid-columnHeaders': { backgroundColor: 'rgba(49, 141, 247, 1)', color: 'rgba(255, 255, 255, 1)', fontSize: 16 },
            '&.MuiDataGrid-toolbarContainer': { padding: 200  }, '.MuiDataGrid-sortIcon': { color: 'rgba(255, 255, 255, 1)', } }}
        disableSelectionOnClick = {true}
        components={{ Toolbar: GridToolbar }}
        rows={rowsArray}
        columns={columnsArray}
        pageSize={20}
        rowsPerPageOptions={[20]}
     />); 

    return (
        <div className= {classes.div}>
            <br></br>
            {/*<br></br>*/}
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
}

export default FeedbackTable;