import React, {Fragment} from 'react';
import {Route} from 'react-router';

import NavBar from '../components/NavBar';
import Header from '../components/Header';

const App = ({routes, history}) => {
    function RouteWithSubRoutes(route) {
        return (
            <Route path={route.path} render={(props) => (
                <route.component {...props} routes={route.routes}/>
            )}/>
        )
    }

    return (
        <Fragment>
            <Header history={history}/>
            <div className='container'>
                <NavBar/>
                <div className='content'>
                    {routes.map((route) => (
                        <RouteWithSubRoutes key={route.path} {...route} />
                    ))}
                </div>
            </div>

        </Fragment>
    )
};

export default App;