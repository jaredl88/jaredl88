import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom'
import { getToken } from '../service/auth';

const PublicRoute = ({ component: Component, ...rest}) => {
    return(
        <Route
        {...rest}
        render={props => {
          return !getToken() ? <Component {...props} />
          : <Redirect to={{ pathname: '/TaskList' }} />
        }}
        
        />
    )
}

export default PublicRoute