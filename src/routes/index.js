import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Admin, Login } from '../views';

const routeArray = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/admin',
        component: Admin,
        exact: true,
        auth: true
    },
    {
        path: '/login',
        component: Login,
        exact: true
    }
];

export const Routes = () => (
    <Switch>
        {routeArray.map(route => (
            <Route key={route.path} {...route} />
        ))}
    </Switch>
);
