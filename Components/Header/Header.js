import React, { useState } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "./Header.css";
import { BiLogInCircle } from "react-icons/bi";
import { MdPlaylistAdd } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { GrView } from "react-icons/gr";
import { GiArchiveRegister } from "react-icons/gi";
import Home from "../../Home";
import Login from "../../Login";
import Todo from "../../addtask";
import PublicRoute from "../../routes/PublicRoutes";
import PrivateRoute from "../../routes/PrivateRoutes";
import Register from "../../Register";
import TaskList from "../../TaskList";
const Header = () => {
  
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false)

    //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
    <div>
    <BrowserRouter>
      <div id="header">
          {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
          <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? "Tasks" : "Tasks"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}
            </div>
          </SidebarHeader>
          
          <div className ="header">
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={window.location.pathname === "/"} icon={<FiHome />}>
                Home <Link to="/" />
              </MenuItem>
              <MenuItem active={window.location.pathname === "/Login/"}icon={<BiLogInCircle  />}> Login </MenuItem>
              <MenuItem active={window.location.pathname === "/Register/"}icon={<GiArchiveRegister />}>Register</MenuItem>
              <MenuItem active={window.location.pathname === "/TaskList/"}icon={<FaList />}>Task List</MenuItem>
              <MenuItem active={window.location.pathname === "/addtask/"} icon={<MdPlaylistAdd />}>Add New Task<Link to="/addtask" /></MenuItem>
              <MenuItem icon={<IoIosCheckmarkCircleOutline />}>Complete Task</MenuItem>
              <MenuItem icon={<GrView />}>Completed</MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
          </div>
        </ProSidebar>
      </div>
      <div className="content">
            <Route exact path="/" component={Home}/>
            <PublicRoute exact path="/register" component={Register}/>
            <PublicRoute exact path="/login" component={Login}/>
            <PublicRoute exact path="/addtask" component={Todo}/>
            <PublicRoute exact path="/TaskList" component={TaskList}/>
          </div>
          </BrowserRouter>
          </div>
    </>
  );
};

export default Header;