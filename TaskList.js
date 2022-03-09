import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./TaskList.css";
import render from "react-dom";
import {getUser, resetUserSession} from './service/auth';
const apiUrl =  'https://j2b30glms2.execute-api.us-east-1.amazonaws.com/prod/gettasks';
    
    
function TaskList () {
    const [getResult, setGetResult] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    
    useEffect(() => {
      fetchData();
    
      }, []);


       useEffect(() => {
        console.log(getResult);
      
        }, [getResult]);

        const fetchData = async () => {
          const requestConfig = {
              //store as envirnment variable later
              headers: {
             'x-api-key': '341SCwBxjy6KSOErzBmCI4mteixN90yC7L8OD37O'
              }
            }
          const response = await axios.get(apiUrl,requestConfig);
          if(!response){
              setErrorMessage('There was an error retrieving tasks')
          }
          setGetResult(response.data.getResponse.Items[0])
         }
console.log(getResult);
const taskArray = Object.entries(getResult)
  console.log(taskArray);
        return(
   
          <div className="TaskList">
             {
           
          taskArray && taskArray.map(taskArrays =>{
            return(
              <div key={taskArrays[0]} style={{alignItems:'center',margin:'20px 60px'}}>
              <h4>{taskArrays[0]}: {taskArrays[1]}</h4> <br />
            </div>
            )
          })
                 
  }
         </div>
       
          );
  
                }

export default TaskList;
