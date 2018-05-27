import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import Movies from './../App/Components/Movies';
import Favorites from './../App/Components/Favorites'
import MovieDetails from './../App/Components/MovieDetails';

const router =
    <Switch>
        <Route exact path="/movies" component={Movies} />
        <Route exact path="/favorites" component={Favorites} />
        <Route exact path="/movie-details/:id" component={MovieDetails} />
        <Redirect from="/*" to="/movies" />
    </Switch>

export default router;