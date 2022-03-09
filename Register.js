import React, { useState } from "react";
import axios from 'axios';
import "./Register.css";



const Register = () => {
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
     'x-api-key': '',
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
        <div className="Register">
           <form onSubmit={submitHandler}>
                    <h2>Registration</h2>
                    <label>Name:</label><input  type="text" value={name} onChange={event=> setName(event.target.value) } /> <br/>
                    <label> User Name:</label><input type="text" value={username} onChange={event=> setUserName(event.target.value) } /> <br/>
                    <label>Password:</label><input type="password" value={password} onChange={event=> setPassword(event.target.value) } /> <br/>
                    <label>Email:</label><input type="text" value={email} onChange={event=> setEmail(event.target.value) } /> <br/>
                    <button type="submit" value="submit">Submit</button>
                </form>
                {message && <p className="message">{message}</p>}
        </div>
    )
}

export default Register;
