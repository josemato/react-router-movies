import React from 'react'
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'

import Layout from './Layout'
import MovieListView from './MovieListView'
import MovieDetailView from './MovieDetailView'
import RouteNotFound from './RouteNotFound'

injectTapEventPlugin()

const MovieApp = (props) => {
    return (
        <Router history={browserHistory}>
            <Route path="/" component={Layout}>
                <IndexRoute component={MovieListView} />
                <Route path="movies" component={MovieListView} />
                <Route path="movies/detail/:id/:title" component={MovieDetailView} />
                <Route path="*" component={RouteNotFound} />
            </Route>
        </Router>
    )
}

export default MovieApp