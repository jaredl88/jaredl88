import React, { useState } from "react";
import axios from 'axios';
import { setUserSession  } from './service/auth';
const apiUrl = 'https://j2b30glms2.execute-api.us-east-1.amazonaws.com/prod/login';

const Login = (props) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
        
    const submitHandler = (event) =>{
            event.preventDefault();
            if(username.trim() === '' || password.trim() === ''){
                setErrorMessage('Both username and password are required');
                return;
            }
            const requestConfig = {
                //store as envirnment variable later
                headers: {
               'x-api-key': '341SCwBxjy6KSOErzBmCI4mteixN90yC7L8OD37O',
                }
            }

            ////get username from login
           const requestBody =
             {
                username: username,
                password: password        
        
                };

        axios.post(apiUrl, requestBody, requestConfig).then((response) =>{
            setUserSession(response.data.user, response.data.token);
            props.history.push('/addtask');
            window.location.reload(false);
        }).catch((error) => {
        if (error.response.status === 401 || error.response.status === 403){
            setErrorMessage(error.response.data.message);
        }else{
            setErrorMessage('Sorry the server is down, please try again later');
        }
        });


        
     
    }
   
    
    return (

        <div className="Login">
        <div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Login now!</h1>
      <p class="py-6">Login to view your task list, add new tasks, set tasks to comepleted, and view completed tasks</p>
    </div>
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">
      <form onSubmit={submitHandler}>
        <div class="form-control">
        
          <label class="label">
            <span class="label-text">Username</span>
          </label>
          <input type="text" placeholder="username" class="input input-bordered" value={username} onChange={event=> setUserName(event.target.value) }/>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" class="input input-bordered" value={password} onChange={event=> setPassword(event.target.value) }/>
          <label class="label">
            <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div class="form-control mt-6">
          <button class="btn btn-primary" type="submit">Login</button>
          
        </div>
        </form>
        {errorMessage && <p className="message">{errorMessage}</p>}
      </div>
    </div>
  </div>
</div>
</div>

        
    )
    }
 
    
export default Login;