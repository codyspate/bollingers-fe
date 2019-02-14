import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Admin } from '../views';

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
    }
];

export const Routes = () => (
    <Switch>
        {routeArray.map(route => (
            <Route {...route} />
        ))}
    </Switch>
);
