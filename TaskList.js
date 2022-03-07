import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./TaskList.css";
import render from "react-dom";
import {getUser, resetUserSession} from './service/auth';
const apiUrl =  'https://j2b30glms2.execute-api.us-east-1.amazonaws.com/prod/gettasks';
    
    
function TaskList () {
    const [getResult, setGetResult] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    
    

    
    
    
  /*  axios.get(apiGetUrl, requestConfig).then((response) => {
         console.log(response);
         var result =[];
         result = JSON.parse(response.data);
         console.log(result);
        setGetResult (result.map( tasks => ({value: tasks.taskName, text: tasks.taskText})));
         }).catch((error) => {
           console.log(error);
           if (error.response.status === 401 || error.response.status === 403){
           setErrorMessage(error.response.data.message);
           }
           else {
               setErrorMessage('sorry ... the server is down! please try again later');
           }
       }) */
    
       useEffect(() => {
        const requestConfig = {
          //store as envirnment variable later
          headers: {
         'x-api-key': '341SCwBxjy6KSOErzBmCI4mteixN90yC7L8OD37O'
          }
        }
       
        //Uses verify api path to verify token sets authenicating to false when authentication is done if verification does 
        //not work resets user session
        axios.get(apiUrl,requestConfig).then(response => {
            console.log(response);
          setGetResult(response.data);
        }).catch((error) => {
            if (error.response.status === 401 || error.response.status === 403){
            setErrorMessage(error.response.message);
            }
            else {
                setErrorMessage('sorry ... the server is down! please try again later');
            }
        })
      
        }, []);

return(
    
        <div className="TaskList">
            <div>
              {getResult}
       </div>
       </div>
      
        )   
              
              }

export default TaskList;