import React, { useState } from "react";
import axios from 'axios';
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
            <div class="flex justify-center pt-6">
           <div class="card lg:card-side bg-gray-200 shadow-xl">
  <figure><img src="https://cdn.pixabay.com/photo/2017/02/27/15/39/todo-2103511__340.png" alt="List" /></figure>
  <div class="card-body">
  <form onSubmit={submitHandler}>
    <h2 class="card-title">Add New Task</h2>
    <p><input type="text" placeholder="Task Name" class="input input-bordered input-md w-full max-w-xs" value={tName} onChange={event=> setTName(event.target.value)}/> <br/><input type="text" placeholder="Task Description" class="input input-bordered input-lg w-full max-w-xs" value={tTxt} onChange={event=> setTxt(event.target.value) } /> <br/></p>
    <div class="card-actions justify-end">
    <button class="btn btn-sm bg-black-500" type="submit" value="addtask">Add Task</button>
    </div>
      </form>
    </div>
  </div>
  </div>


               
               
               
               
               
          

    )
}
   

export default Todo;