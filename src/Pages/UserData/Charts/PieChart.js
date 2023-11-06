import React, {useState, useRef}  from 'react';
import _ from 'lodash';
import { Button } from '@mui/material';
import {
      Chart as ChartJS,
      registerables
    } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

//Function that generates a Pie Chart image exportable as .pgn & .json
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
    const id = touchpointArray.ID;
    var touchpointDataArray = _.get(props.touchpointDataArray, id);
      const [labelsShowing, setLabelsShowing] = useState(0);
      let piechartRef = useRef(null);

    touchpointArray = _.omit(touchpointArray, 'Alias', 'Total', 'Type', 'Time', 'ID');
    for (let i in touchpointArray) {
        var str = "";
        if (type === "R10") {
            console.log('in here');
            str = _.split(i, '_');
            if (str[1] === "1") {
                str = str[1] + ": " + touchpointDataArray.MinimumOption;
            } else if (str[1] === "10") {
                str = str[1] + ": " + touchpointDataArray.MaximumOption;
            } else {
                str = str[1];
            }
            labels.push(str);
            dataset.push(touchpointArray[i]);
        } else if (type === "R5") {
            str = _.split(i, '_');
            if (str[1] === "-2") {
                str = str[1] + ": " + touchpointDataArray.LeftOption;
            } else if (str[1] === "0") {
                str = str[1] + ": " + touchpointDataArray.CenterOption;
            } else if (str[1] === "2") {
                str = str[1] + ": " + touchpointDataArray.RightOption;
            } else {
                str = str[1];
            }
            labels.push(str);
            dataset.push(touchpointArray[i]);
        } else if (type === "MC") {
            str = _.split(i, 'n');
            if (str[1] === "1") {
                str = str[1] + ": " + touchpointDataArray.Option1;
            } else if (str[1] === "2") {
                str = str[1] + ": " + touchpointDataArray.Option2;
            } else if (str[1] === "3") {
                str = str[1] + ": " + touchpointDataArray.Option3;
            } else if (str[1] === "4") {
                str = str[1] + ": " + touchpointDataArray.Option4;
            }
            labels.push(str);
            dataset.push(touchpointArray[i]);
        } else {
            labels.push(i);
            dataset.push(touchpointArray[i]);
        }
    }

      if(type === "R10"){
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
                position: 'bottom',
              },
              title: {
                display: true,
                text: "Video: " + props.alias + " | Touchpoint: " + alias + " | Time: " + time + " | Total Responses: " + total + " | ID: " + props.tpId,
                font: {
                  size: 15,
                  weight: 'bold',
                }
                }, subtitle: {
                    display: true,
                    text: touchpointDataArray.Prompt,
                    font: {
                        size: 13,
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

                        return ((labelsShowing===2)? "":((labelsShowing===1)? ((value===0)? "":(Math.round(value/total*10000)/100 + '%')):((type=="MCI")? ((value==0)? "":(Math.round(value/total*10000)/100 + '%')) : ((value==0)? "":(context.chart.data.labels[context.dataIndex] + "\n" + value + " / " + total + "  |  " + Math.round(value/total*10000)/100 + '%')))));
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


      function exportPieChartPng(){
            const link = document.createElement("a");
            link.download = props.tpId + "_Touchpoint_PieChart.png";
            link.href =  piechartRef.current.toBase64Image();
            link.click();
      }

      function exportPieChartJson(){
            const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
                  JSON.stringify(touchpointArray)
            )}`;
            
            const link = document.createElement("a");
            link.href = jsonString;     
            link.download = (props.title+"-"+ props.tpId + ".json");
            
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
                  <Button sx={{textTransform:'none', '&:hover':{backgroundColor: '#000b9e', borderColor:'#000b9e'}}} variant="contained" size="small" onClick={exportPieChartPng}>
                        Export Pie Chart
                  </Button>
                  &emsp;&emsp;
                  <Button sx={{textTransform:'none', '&:hover':{backgroundColor: '#000b9e', borderColor:'#000b9e'}}} variant="contained" size="small" onClick={labelHandler}>
                        Toggle Labels
                  </Button>
                  &emsp;&emsp;
                  <Button sx={{textTransform:'none', '&:hover':{backgroundColor: '#000b9e', borderColor:'#000b9e'}}} variant="contained" size="small" onClick={exportPieChartJson}>
                        Export .json
                  </Button>
            </div>
      );
} export default PieChart;