import {BrowerRouter, Routes, Switch, Redirect} from 'react';
import React from 'react';
import {usuarioAutenticado} from './services/auth';

import Login from './Login/Login'
import Main from './Main/Main'

const PrivateRouter = ({component : Component}) => (
<Route
    render={
        usuarioAutenticado() ? 
            (<Component {...props} />)
                :
            (<Redirect to={{pathname: '/main'}} />)
    }
/>
)

export default routes = () => 
    <BrowerRouter>
        <Switch>
            <Routes exact path='/' component={Login}/>
            <PrivateRouter path='' Component={Main}/>
        </Switch>
    </BrowerRouter>
