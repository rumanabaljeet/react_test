import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import Movies from './../App/Components/Movies';

const router =
    <Switch>
        <Route exact path="/movies" component={Movies} />
        <Redirect from="/*" to="/movies" />
    </Switch>

export default router;