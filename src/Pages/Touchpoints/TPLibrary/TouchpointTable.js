import { DataGrid, GridToolbar, GridColDef} from '@mui/x-data-grid';
import _ from 'lodash';
import classes from './TouchpointTable.module.css';
import {Button} from '@mui/material';
import {React} from 'react';
import { Link } from 'react-router-dom';


var arrayOfTemplates = '';
function TouchpointTable(props){
      //console.log('--------------------')


      var templateTableEnabledArray = props.templateTableEnabledArray;
      arrayOfTemplates = props.arrayOfTemplates;
      //console.log('Array Of Templates: ');      
      //console.log(arrayOfTemplates);
      //console.log('Table Enabled Array: ');
      //console.log(templateTableEnabledArray);

      const allTemplatesColumns: GridColDef [] = [
            {field: 'Alias', headerName: 'Template Alias', width: 260, headerAlign: 'center', align: 'center'},
            {field: 'Type', headerName: 'Touchpoint Type', width: 200, headerAlign: 'center', align: 'center'},
            {field: 'Times Used', headerName: 'Times Used', width: 130, headerAlign: 'center', align: 'center'},
            {field: 'Question Prompt', headerName: 'Question Prompt', width: 320, headerAlign: 'center', align: 'center'},
            { field: 'btn', headerName: 'Actions', renderCell: (params) => (
                  <strong > 
                        <Link to = '/touchpoints/touchpoint-template-library/edit-touchpoint'>
                              <Button variant="contained" size="small" onClick = {()=>templateArrayHandler(params)}> VIEW </Button> 
                        </Link>
                  </strong> ),
            width: 126, headerAlign: 'center', align: 'center', }, 
      ];

      function templateArrayHandler(params){
            arrayOfTemplates = _.get(arrayOfTemplates, [params.id]);
            //console.log(arrayOfTemplates);
      }
      const dataGrid = (<DataGrid
            sx={{ border: 1, '& .MuiDataGrid-columnHeaders': { backgroundColor: 'rgba(49, 141, 247, 1)', color: 'rgba(255, 255, 255, 1)', fontSize: 16 },
                '&.MuiDataGrid-toolbarContainer': { padding: 200  }, '.MuiDataGrid-sortIcon': { color: 'rgba(255, 255, 255, 1)', } }}
            disableSelectionOnClick = {true}
            components={{ Toolbar: GridToolbar }}
            rows={templateTableEnabledArray}
            columns={allTemplatesColumns}
            pageSize={20}
            rowsPerPageOptions={[20]}
         />); 
      
      return(
            <div>
                  
                  <h1 className= {classes.h1}>Touchpoint Templates</h1>
                  <ul className = {classes.list}>
                        <div className = {classes.lowerDiv} >
                              {dataGrid}
                        </div>
                  </ul>
            </div>
      );
}
export default TouchpointTable;
export {arrayOfTemplates};

