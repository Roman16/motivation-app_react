import React, {Fragment} from 'react';
import { Router, Route, Redirect } from 'react-router';
import {createBrowserHistory} from 'history';
import Login from "./pages/Login";
import OfferedPhrases from "./pages/OfferedPhrases";
import Categories from "./pages/Categories";
import Faq from "./pages/Faq";
import App from "./pages";

const history = createBrowserHistory();

const isLoggedIn = () => {
    return localStorage.getItem('TOKEN') ? true : false;
};

const routes = [
    {
        path: '/',
        component: App,
        routes: [
            {
                path: '/offered_phrases',
                component: OfferedPhrases
            },
            {
                path: '/categories',
                component: Categories
            },
            {
                path: '/faq/:type',
                component: Faq
            }
        ]
    }
];

const PrivateRoute = (route) => (
    <Route path={route.path} render={(props) => (
        isLoggedIn() ?
            <route.component {...props} routes={route.routes}/>
            :
            <Redirect to='/login' />
    )}/>
);

const Routing = () => {
    return (
        <Router history={history}>
            <Fragment>
                <Route exact path='/login' component={Login}/>

                {routes.map((route) => (
                    <PrivateRoute key={route.path} {...route} />
                ))}
            </Fragment>
        </Router>
    )
};

export default Routing;
