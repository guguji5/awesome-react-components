import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { dynamicPackages, Entry } from '@/utils';
import StatusCard from '@/pages/status-card';
const Packages = dynamicPackages();
let lazyRoutes = Packages.reduce((result: any, module: Entry) => {
  return (result = result.concat(module.routes));
}, []);
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

export default function Content() {
  return (
    <div className='content'>
      <Switch>
        {lazyRoutes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
        <Route exact path='/status-card' component={StatusCard} />
        <Route path='/' exact>
          <Redirect to='/demo' />
        </Route>
      </Switch>
    </div>
  );
}
