import React from 'react';
import Login from "./Login";
import Register from "./Register";
import { BrowserRouter, Switch, NavLink } from "react-router-dom";
import PublicRoute from "./routes/PublicRoutes.js";


const Home = () => {
    return (
        <>
         <BrowserRouter>
        <div className="Home">
            
   <div class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Hello there</h1>
      <p class="py-6">My name is Jared and this is my first react project.You can add tasks, view task list, complete tasks, and view a list of your completed tasks. Passwords are hashed and salted before being sent to dynamodb.</p>
      <div class="space-x-4">
      <button class="btn btn-primary pr=1.5" onClick="window.location.reload();"><NavLink exact activeClassName="active" to="/Register">Register</NavLink></button>
      <button class="btn btn-primary" onClick="window.location.reload();"> <NavLink exact activeClassName="active" to="/Login">Login</NavLink></button>
      </div>
    </div>
  </div>
 
</div>
        </div>
        <div className="content">
        <Switch>
            <PublicRoute exact path="/register" component={Register}/>
            <PublicRoute exact path="/login" component={Login}/>
            </Switch>
          </div>
        </BrowserRouter>
        </>
    );
};

export default Home;