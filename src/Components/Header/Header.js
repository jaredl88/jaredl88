import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import Home from "../../Home";
import Login from "../../Login";
import Todo from "../../addtask";
import PublicRoute from "../../routes/PublicRoutes.js";
import PrivateRoute from "../../routes/PrivateRoutes";
import Register from "../../Register";
import TaskList from "../../TaskList";
import { resetUserSession, getUser } from "../../service/auth";
import CompletedTaskList from "../../getCompleted";
const Header = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);

    


    //create initial menuCollapse state using useState hook

    useEffect(() => {
      if(getUser() !== null) setLoggedIn(true);
      else setLoggedIn(false);
      console.log(getUser());
      }, []);
      useEffect(() => {
       console.log(loggedIn)
     
        }, [loggedIn]); 
  
    const Logout = () =>{
      resetUserSession();
      setLoggedIn(false);
      props.history.push('Login');
      window.location.reload(false);
    }
    
  
  return (
    <>
    <BrowserRouter>
    <div class="top-9">
   <div class="navbar bg-base-100" >
  <div class="flex-1">
  <button class="btn shadow-xl bg-slate-600" onClick={Home}><NavLink exact activeClassName="active"  to="/">Home</NavLink></button>
  </div>
  <div class="flex-none visible hover:invisible">
    <ul class="menu menu-horizontal p-0">
      <li tabindex="0">
        
        <a>
        
          Links
          <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
      
        </a>
        
        <ul class="p-2 bg-base-100 inset-y-7 visible static">
        <div>
           {
             loggedIn === false ?
             <div>
          <li><NavLink exact activeClassName="active" to="/Login">Login</NavLink></li>
          <li><NavLink exact activeClassName="active" to="/Register">Register</NavLink></li>
          </div>
        :
        <div>
          <li><NavLink exact activeClassName="active" to="/addtask" >Add Task</NavLink></li>
          <li><NavLink exact activeClassName="active" to="/TaskList">Task List</NavLink></li>
          <li><NavLink exact activeClassName="active" to="/getCompleted">Completed Tasks List</NavLink></li>
          </div>
        }
        </div>
        </ul>
      </li>
    </ul>
    </div>
    <div>
      {
        loggedIn === false ?
    <div class="flex-1 right-0">
      <button class="btn shadow-xl bg-slate-600" onClick={Login}><NavLink exact activeClassName="active" to="/Login">Login</NavLink></button>
      </div>
      :
      <div class="flex-1 right-0">
      <button class="btn shadow-xl bg-slate-600" onClick={Logout}>Logout</button>
      </div>
      }
      </div>
  </div>
  </div>
  <div className="content">
    <Switch>
            <Route exact path="/" component={Home}/>
            <PublicRoute exact path="/register" component={Register}/>
            <PublicRoute exact path="/login" component={Login}/>
            <PrivateRoute exact path="/addtask" component={Todo}/>
            <PrivateRoute exact path="/TaskList" component={TaskList}/>
            <PrivateRoute exact path="/getCompleted" component={CompletedTaskList}/>
            </Switch>
          </div>
</BrowserRouter>
    </>
  );
};

export default Header;