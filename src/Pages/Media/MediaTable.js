import { DataGrid, GridToolbar, GridColDef} from '@mui/x-data-grid';
import _ from 'lodash';
import classes from './MediaTable.module.css';
import {Button} from '@mui/material';
import {React} from 'react';
import { Link } from 'react-router-dom';

function MediaTable(props){
      //1037
      var arrayOfVideos = props.arrayOfVideos;
      var videoTableEnabledArray = props.videoTableEnabledArray;
      const allVideosColumns: GridColDef [] = [
            {field: 'Title', headerName: 'Video Title', width: 350, headerAlign: 'center', align: 'center'},
            {field: 'Upload Date', headerName: 'Upload Date', width: 170, headerAlign: 'center', align: 'center'},
            //{field: 'Description', headerName: 'Description', width: 250, headerAlign: 'center', align: 'center'},
            {field: 'Length', headerName: 'Length', width: 130, headerAlign: 'center', align: 'center'},
            {field: 'Touchpoints', headerName: 'Touchpoint #', width: 145, headerAlign: 'center', align: 'center'},
            {field: 'State', headerName: 'State', width: 110, headerAlign: 'center', align: 'center'},
            {field: 'btn', headerName: 'Actions', renderCell: (params) => (
                  <strong>
                        <span>
                              <Link to = '/Goldilocks-Suds-Website-Deploy/media/view-video'>
                                    <Button variant="contained" size="small" onClick = {()=>viewVideoHandler(params)}> VIEW </Button> 
                              </Link>

                        </span>
                  </strong>
            ), width: 130, headerAlign: 'center', align: 'center'},
      ];

      function viewVideoHandler(){

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



      return(
            <div>
                  <h1 className= {classes.h1}>Videos</h1>
                  <ul className = {classes.list}>
                        <div className = {classes.lowerDiv} >
                              {dataGrid}
                        </div>
                  </ul>
                  <div>
                        <Link to='/Goldilocks-Suds-Website-Deploy/media/add-new'>
                              <Button variant="contained" size="large">
                                    ADD NEW
                              </Button>                                        
                        </Link>
                  </div>
            </div>
      );      
}
export default MediaTable;