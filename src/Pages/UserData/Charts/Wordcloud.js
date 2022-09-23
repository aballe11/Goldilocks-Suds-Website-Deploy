import React, {useState, useRef}  from 'react';
import _ from 'lodash';
import { Button } from '@mui/material';
import keyword_extractor from 'keyword-extractor';
import {
      Chart as ChartJS,
      registerables
    } from 'chart.js';
import {WordCloudController, WordElement } from 'chartjs-chart-wordcloud';
import { Chart } from 'react-chartjs-2';
import { TagCloud } from 'react-tagcloud';




function Wordcloud(props){

      var wordCloudData = [];
      
      /*ChartJS.register(
            ...registerables,
            WordCloudController,
            WordElement,
      );*/

      for(var i in props.responsesArray){
            
            var extraction_result = keyword_extractor.extract(props.responsesArray[i], {
                  language:"english",
                  remove_digits: true,
                  return_changed_case:true,
                  remove_duplicates: false
            }); 

            for(var i = 0; i < extraction_result.length; i++){
                  var found = false;
                  var string = extraction_result[i].toLowerCase();

                  if(wordCloudData.length > 0){
                        for(var j = 0; j < wordCloudData.length; j++){
                              if(wordCloudData[j].value == string){
                                    wordCloudData[j].count = wordCloudData[j].count + 1;
                                    found = true;
                              }
                        } 
                        if(!found){
                              wordCloudData.push({
                                    value: string,
                                    count: 1,
                              })
                        }
                        
                  } else {
                        wordCloudData.push({
                              value: string,
                              count: 1,
                        })
                  }
            }
      }

      console.log(wordCloudData);



      return(
            <div >
                  <TagCloud disableRandomColor minSize={15} maxSize={50} tags={wordCloudData}/>
            </div>
      );

} export default Wordcloud;