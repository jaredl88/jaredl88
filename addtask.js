import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./addtask.css";
import {getUser} from './service/auth';
const apiUrl = 'https://j2b30glms2.execute-api.us-east-1.amazonaws.com/prod/addtask';

   const Todo = () => {
    const [tName, setTName] = useState('');
    const [tTxt, setTxt] = useState('');
    const userName = getUser(); 
    const username= userName.username;   
   const [message, setMessage] = useState(null);
    const submitHandler =(event) => {
      event.preventDefault();
      if(tName.trim() === '') {
        setMessage('Please enter a task Name');
        return;
    }
    if(tTxt.trim() === '') {
        setMessage('Please enter a task');
        return;
    }
    setMessage(null);
    const requestConfig = {
        //store as envirnment variable later
        headers: {
       'x-api-key': '341SCwBxjy6KSOErzBmCI4mteixN90yC7L8OD37O',
        }
    }
    const requestBody =
    {
         ////get username from login
        username: username,
        tName: tName,
        tTxt: tTxt
    };
    console.log(requestBody);
    axios.post(apiUrl, requestBody, requestConfig).then(response => {
        setMessage('Task Added Successfully');
    }).catch(error => {
        if (error.response.status === 401 || error.response.status === 403){
        setMessage(error.response.data.message);
        }
        else {
            setMessage('sorry ... the server is down! please try again later');
        }
    })
        }
   
 
   
        return(
            
                <div className="addtask"> 
                <form onSubmit={submitHandler}>
                    <h5>Add New Task</h5>
                    <label>Task Name:</label><input  type="text" value={tName} onChange={event=> setTName(event.target.value) } /> <br/>
                    <label> Task:</label><input type="text" value={tTxt} onChange={event=> setTxt(event.target.value) } /> <br/>
                    <button type="submit" value="addtask">Add Task</button>
                </form>
                {message && <p className="message">{message}</p>}
                </div>
          

    )
}
   

export default Todo;