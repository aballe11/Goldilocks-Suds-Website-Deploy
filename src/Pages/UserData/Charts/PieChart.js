import React, {useState, useRef}  from 'react';
import _ from 'lodash';
import { Button } from '@mui/material';
import {
      Chart as ChartJS,
      registerables
    } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

function PieChart(props){
      ChartJS.register(
            ...registerables,
            ChartDataLabels,
          );

      var touchpointArray = props.touchpointArray;
      var labels = []
      var dataset = []
      const alias = touchpointArray.Alias;
      const total = touchpointArray.Total;
      const type = touchpointArray.Type;
      const time = touchpointArray.Time;
      const [labelsShowing, setLabelsShowing] = useState(0);
      let piechartRef = useRef(null);

      touchpointArray = _.omit(touchpointArray, 'Alias', 'Total', 'Type', 'Time');
      //touchpointArray = _.sortBy(touchpointArray, ['Time', 'Type', 'Alias'], ['desc', 'asc', 'asc'])

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

      labels.push(labels.shift());
      dataset.push(dataset.shift());

      const options = {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
              },
              title: {
                display: true,
                text: "Video: " + props.title + " | Touchpoint: " + alias + " | Time: " + time + " | Total Responses: " + total + " | ID: " + props.tpId,
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

                        return ((labelsShowing==2)? "":((labelsShowing==1)? ((value==0)? "":(Math.round(value/total*10000)/100 + '%')):((type=="MCI")? ((value==0)? "":(Math.round(value/total*10000)/100 + '%')) : ((value==0)? "":(context.chart.data.labels[context.dataIndex] + "\n" + value + " / " + total + "  |  " + Math.round(value/total*10000)/100 + '%')))));
                        }
                  }
            },
      };

      const data = {
            labels: labels,
            datasets: [{
                label: 'User Feedback',
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


      function exportPieChart(){
            const link = document.createElement("a");
            link.download = props.tpId + "_Touchpoint_PieChart.png";
            link.href =  piechartRef.current.toBase64Image();
            link.click();
      }

      function labelHandler(){
            setLabelsShowing(!labelsShowing);
            if(labelsShowing == 2){
                  setLabelsShowing(0);
            } else {
                  setLabelsShowing(labelsShowing + 1);
            }
      }

      return(
            <div>
                  <Pie ref={piechartRef} options = {options} data = {data} />
                  <br/>
                  <Button variant="contained" size="small" onClick={exportPieChart}>
                        Export Pie Chart
                  </Button>
                  &emsp;&emsp;
                  <Button variant="contained" size="small" onClick={labelHandler}>
                        Toggle Labels
                  </Button>
            </div>
      );
} export default PieChart;