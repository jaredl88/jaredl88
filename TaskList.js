import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./TaskList.css";
import {getUser, resetUserSession} from './service/auth';
const apiUrl =  '';
const apiDeleteUrl =    '';
   
function TaskList () {
    const [getResult, setGetResult] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [message, setMessage] = useState(null);
    const [tName, setTName] = useState('');

    const deleteTask = (event)=>{
      event.preventDefault();
      
      const requestConfig = {
        //store as envirnment variable later
        headers: {
       'x-api-key': ''
        }
      }
      const requestBody = {
        tName: tName
      }
        const response = axios.post(apiDeleteUrl, requestBody, requestConfig);
        if(!response){
          setErrorMessage('There was an error retrieving tasks')
      }
      setMessage('')
     
    }
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
             'x-api-key': ''
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
           
          taskArray && taskArray.map(taskArrays =>{ if (taskArrays[0] !== 'username'){
            return(
              <form onSubmit={deleteTask}>
              <div key={taskArrays[0]} style={{alignItems:'center',margin:'20px 60px'}}>
              <h4>{taskArrays[0]}: {taskArrays[1]} <button type="submit" value="submit" onClick={ event=> setTName(taskArrays[0].toString())}>Complete Task</button></h4><br />
          
            </div>
            </form> 
             
            )
           }})
          
                 
  }
         </div>
       
          );
 
                }

export default TaskList;
