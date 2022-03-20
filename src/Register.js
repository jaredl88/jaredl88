import React, { useState } from "react";
import axios from 'axios';
import PreviousMap from "postcss/lib/previous-map";




const Register = (props) => {
const [name, setName ] = useState('');
const [username, setUserName ] = useState('');
const [password, setPassword ] = useState('');
const [email, setEmail ] = useState('');
const [message, setMessage] = useState(null);
const apiUrl = 'https://j2b30glms2.execute-api.us-east-1.amazonaws.com/prod/register';

const submitHandler =(event) => {
    event.preventDefault();
    if(name.trim() === '') {
      setMessage('Please enter a Name');
      return;
  }
  if(username.trim() === '') {
      setMessage('Please enter a username');
      return;
  }
  if(username.trim() === '') {
    setMessage('Please enter a username');
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
      name: name,
      username: username,
      password: password,
      email: email
  };

  axios.post(apiUrl, requestBody, requestConfig).then(response => {
      setMessage('Registration Successful!');
      props.history.push('Login');
  }).catch(error => {
      if (error.response.status === 401 || error.response.status === 403){
      setMessage(error.response.data.message);
      }
      else {
          setMessage('sorry ... the server is down! please try again later');
      }
  })
      }


    return (
        <div className="Login">
        <div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Register</h1>
      <p class="py-6">Register then log in to view your task list, add new tasks, set tasks to comepleted, and view completed tasks</p>
    </div>
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">
      <form onSubmit={submitHandler}>
        <div class="form-control">
         <label class="label">
            <span class="label-text">Name</span>
          </label>
          <input type="text" placeholder="name" class="input input-bordered" value={name} onChange={event=> setName(event.target.value) }/>
        </div>
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
        </div>
        <div class="form-control">
         <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input type="text" placeholder="email" class="input input-bordered" value={email} onChange={event=> setEmail(event.target.value) }/>
        </div>
        <div class="form-control mt-6">
          <button class="btn btn-primary" type="submit">Register</button>
          
        </div>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  </div>
</div>
</div>
        
    )
}

export default Register;