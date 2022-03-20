
import {getUser, resetUserSession} from './service/auth';
import React, { useEffect, useState } from "react";
import axios from 'axios';
const apiUrl = 'https://j2b30glms2.execute-api.us-east-1.amazonaws.com/prod/getcompleted';
const apiAddUrl = 'https://j2b30glms2.execute-api.us-east-1.amazonaws.com/prod/addtask';
   
const CompletedTaskList = () => {
    const [getResult, setGetResult] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [message, setMessage] = useState(null);
    const [tTxt, setTtxt] = useState('');
    const [tName, setTname] = useState('');
    const userName = getUser(); 
    const username= userName.username;

    const addTask = (event)=>{
      event.preventDefault();
      
      const requestConfig = {
        //store as envirnment variable later
        headers: {
          'x-api-key': '341SCwBxjy6KSOErzBmCI4mteixN90yC7L8OD37O',
        }
      }
     
      const requestBody = {
        username: username,
        tName: tName,
        tTxt: tTxt
        
      }
        const response = axios.post(apiAddUrl, requestBody, requestConfig);
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
                'x-api-key': '341SCwBxjy6KSOErzBmCI4mteixN90yC7L8OD37O',
              }
            }
            
            const requestBody = {
              username: username
            };
          const response = await axios.post(apiUrl,requestBody,requestConfig);
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
           
          taskArray && taskArray.map(taskArrays =>{ if (taskArrays[0] !== 'username' && taskArrays[0] !== 'Username'){
            return(
              <form onSubmit={addTask}>
                          <div key={taskArrays[0]} style={{alignItems:'center',margin:'20px 60px'}}>
             <div class="divider text-2xl">{taskArrays[0]}</div>
             <div class="flex flex-col w-full border-opacity-50">
            <div class="grid h-20 card bg-base-300 rounded-box place-items-center text-xl">{taskArrays[1]}<button class="btn btn-sm bg-black-500" type="submit" value="submit" onClick={event=> {setTname(taskArrays[0].toString()); setTtxt(taskArrays[1].toString())}}>Add back to todo</button></div>
 

</div>
           

       
         </div>
            </form> 
             
            )
           }})
          
                 
  }
         </div>
       
          );
 
                }

export default CompletedTaskList;