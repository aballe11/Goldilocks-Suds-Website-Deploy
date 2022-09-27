import React, {useState, useRef}  from 'react';
import _ from 'lodash';
import { Button } from '@mui/material';
import {
      Chart as ChartJS,
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend,
    } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

//Function that generates a Bar Chart image exportable as .pgn & .json
function  BarChart(props){
      ChartJS.register(
            CategoryScale,
            LinearScale,
            BarElement,
            Title,
            Tooltip,
            Legend,
            ChartDataLabels
          );

      var touchpointArray = props.touchpointArray;
      var labels = [];
      var dataset = [];
      const alias = touchpointArray.Alias;
      const total = touchpointArray.Total;
      const type = touchpointArray.Type;
      const time = touchpointArray.Time;
      const [labelsShowing, setLabelsShowing] = useState(true);
      let barchartRef = useRef(null);

      touchpointArray = _.omit(touchpointArray, 'Alias', 'Total', 'Type', 'Time');


      for(let i in touchpointArray){
            if(type==="R10" || type==="R5") {
                  var str = _.split(i, '_');
                  str = _.slice(str, 0, 2);
                  str = _.join(str, ' ');
                  labels.push(str);
                  dataset.push(touchpointArray[i]);
            } else {
                  labels.push(i);
                  dataset.push(touchpointArray[i]);
            }
      }
      if(type==="R10"){
            labels.push(labels.shift());
            dataset.push(dataset.shift());
      } else if (type === "R5"){
            const tempLbl = labels[0];
            const tempNo = dataset[0];
            labels[0] = labels[1];
            dataset[0] = dataset[1];
            labels[1] = tempLbl;
            dataset[1] = tempNo;
      }


      const options = {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: "Video: " + props.alias + " | Touchpoint: " + alias + " | Time: " + time + " | Total Responses: " + total + " | ID: " + props.tpId,
                font: {
                  size: 15,
                  weight: 'bold',
                }
              },
              datalabels: {
                  labels: {
                        value: {
                              font: {
                                    size: 15,
                              },
                              color: '#000000',
                              anchor: 'end',
                              align: 'start',
                        }
                  },
                  formatter: function(value, context) {
                        return (labelsShowing)? ((value == 0) ? "":Math.round(value/total*10000)/100 + '%'):"";
                      }
                }
            },
      };

      const data = {
            labels: labels,
            datasets: [
              {
                //label: labels,
                data: dataset,
                backgroundColor: ['rgba(231,76,60)', 
                'rgba(52,152,219)',
                'rgba(22,160,133)',
                'rgba(46,204,113)',
                'rgba(241,196,15)',
                'rgba(142,68,173)',
                'rgba(255, 146, 245)',
                'rgba(243,156,18)',
                'rgba(211,84,0)',
                'rgba(121,125,127)',
                'rgba(245,183,177)',
                'rgba(174,214,241)',
                'rgba(162,217,206)',
                'rgba(171,235,198)',
                'rgba(249,231,159)',
                'rgba(210,180,222)',
                'rgba(255, 216, 251)',
                'rgba(250,215,160)',
                'rgba(229,152,102)',
                'rgba(202,207,210)',],
              },
            ],
          };

      function exportBarChartPng(){
            const link = document.createElement("a");
            link.download = props.tpId + "_Touchpoint_BarChart.png";
            link.href =  barchartRef.current.toBase64Image();
            link.click();
      }

      function labelHandler(){
            setLabelsShowing(!labelsShowing);
      }

      return(
            <div>
                  <Bar ref={barchartRef} options = {options} data = {data} />
                  <br/>
                  <Button sx={{textTransform:'none', '&:hover':{backgroundColor: '#000b9e', borderColor:'#000b9e'}}} variant="contained" size="small" onClick={exportBarChartPng}>
                        Export Bar Chart
                  </Button>
                  &emsp;&emsp;
                  <Button sx={{textTransform:'none', '&:hover':{backgroundColor: '#000b9e', borderColor:'#000b9e'}}} variant="contained" size="small" onClick={labelHandler}>
                        Toggle Labels
                  </Button>
            </div>
      );

} export default BarChart;