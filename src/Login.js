import React, { useState } from "react";
import axios from 'axios';
import { setUserSession  } from './service/auth';
import "./Login.css";
const apiUrl = '';

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
               'x-api-key': '',
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
            <form onSubmit={submitHandler}>
                    <h5>Login</h5>
                    <label>Username:</label><input  type="text" value={username} onChange={event=> setUserName(event.target.value) } /> <br/>
                    <label> Password:</label><input type="password" value={password} onChange={event=> setPassword(event.target.value) } /> <br/>
                    <button type="submit" value="addtask">Login</button>
                </form>
                {errorMessage && <p className="message">{errorMessage}</p>}
        </div>
        
    )
    }
 
    
export default Login;
