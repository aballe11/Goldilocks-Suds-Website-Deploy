import { DataGrid, GridToolbar, GridColDef} from '@mui/x-data-grid';
import _ from 'lodash';
import classes from './MediaTable.module.css';
import {Button} from '@mui/material';
import {React, useState} from 'react';
import { Link } from 'react-router-dom';
import VideoUploader from './VideoUploader';

//Uses data to generate a data table, buttons to either edit a specific video or upload a new one.
var selectedVideoID = '';
function MediaTable(props){
      //1037
      const [showVideoUploader, setShowVideoUploader] = useState(false);
      var arrayOfVideos = props.arrayOfVideos;
      var videoTableEnabledArray = props.videoTableEnabledArray;
      
      
      const allVideosColumns: GridColDef [] = [
            {field: 'Title', headerName: 'Title', width: 350, headerAlign: 'center', align: 'center'},
            {field: 'Upload Date', headerName: 'Upload Date', width: 150, headerAlign: 'center', align: 'center'},
            //{field: 'Description', headerName: 'Description', width: 250, headerAlign: 'center', align: 'center'},
            {field: 'Length', headerName: 'Length (s)', width: 120, headerAlign: 'center', align: 'center'},
            {field: 'Touchpoints', headerName: 'Touchpoints (amt)', width: 175, headerAlign: 'center', align: 'center'},
            {field: 'Status', headerName: 'Status', width: 110, headerAlign: 'center', align: 'center'},
            {field: 'btn', headerName: 'Actions', renderCell: (params) => (
                  <strong>
                        <span>
                              <Link to = '/Goldilocks-Suds-Website-Deploy/media/edit-video'>
                                    <Button sx={{textTransform:'none', '&:hover':{backgroundColor: '#000b9e', borderColor:'#000b9e'}}} variant="contained" size="small" onClick = {()=>viewVideoHandler(params)}> View </Button> 
                              </Link>

                        </span>
                  </strong>
            ), width: 130, headerAlign: 'center', align: 'center'},
      ];

      function viewVideoHandler(params){
            selectedVideoID = params.id;
      }

      const dataGrid = (<DataGrid
            sx={{ border: 1, '& .MuiDataGrid-columnHeaders': { backgroundColor: 'rgba(49, 141, 247, 1)', color: 'rgba(255, 255, 255, 1)', fontSize: 16 },
                '&.MuiDataGrid-toolbarContainer': { padding: 200  }, '.MuiDataGrid-sortIcon': { color: 'rgba(255, 255, 255, 1)', } }}
            disableSelectionOnClick = {true}
            components={{ Toolbar: GridToolbar }}
            rows={videoTableEnabledArray}
            columns={allVideosColumns}
            pageSize={20}
            rowsPerPageOptions={[20]}
      />);

      function toggleVideoUploader(){
            setShowVideoUploader(!showVideoUploader)
      }

      function returnModal () {
            return ( <VideoUploader toggle={toggleVideoUploader}/>);
        }
        

      return(
            <div>
                  <h1 className= {classes.h1}>Videos</h1>
                  <ul className = {classes.list}>
                        <div className = {classes.lowerDiv} >
                              {dataGrid}
                        </div>
                  </ul>
                  <div>
                        <Button sx={{textTransform:'none', '&:hover':{backgroundColor: '#000b9e', borderColor:'#000b9e'}}} variant="contained" size="large" onClick={toggleVideoUploader}>
                              Add New
                        </Button>                                        
                  </div>
                  {showVideoUploader?  returnModal():null}
            </div>
      );      
}
export default MediaTable;
export {selectedVideoID};