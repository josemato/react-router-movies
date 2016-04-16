import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import MovieListViewStore from '../store/MovieListViewStore'
import TabOrderBy from './TabOrderBy'
import MovieItem from './MovieItem'
import MovieService from '../services/MovieService'
import MovieUtils from '../lib/MovieUtils'

import AppBar from 'material-ui/lib/app-bar'
import GridList from 'material-ui/lib/grid-list/grid-list'

let styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: '100%',
        marginBottom: 24,
    },
}

class MovieListView extends Component {
    constructor(props) {
        super(props)
        
        this.state = MovieListViewStore.getState()
    }
    
    componentDidMount() {
        MovieService.fetchMovies().then((movies) => {
            this.setState({
                movies: movies
            })
        })
    }
    
    onOrderByClick(orderBy) {
        this.setState({
            orderBy: orderBy
        })
    }
    
    showMovieDetail(movie) {
        browserHistory.push(`movies/detail/${movie.id}/${movie.titleSlug}`)
    }
    
    componentWillUnmount() {
        this.saveStateBeforeLeave()
    }
    
    saveStateBeforeLeave() {
        MovieListViewStore.saveState(this.state)
    }
    
    render() {
        let movies = MovieUtils.orderBy(this.state.orderBy, this.state.movies)

        return (
            <div styles={styles.root}>
                <AppBar title="Movies App" showMenuIconButton={false} />
                
                <div>
                    <TabOrderBy selectedTab={this.state.orderBy}  onClick={this.onOrderByClick.bind(this)} text="Year" orderBy="year" />
                    <TabOrderBy selectedTab={this.state.orderBy} onClick={this.onOrderByClick.bind(this)} text="Title" orderBy="title" />
                    <TabOrderBy selectedTab={this.state.orderBy} onClick={this.onOrderByClick.bind(this)} text="Rating" orderBy="rating" />
                </div>
                
                <GridList cellHeight={200} style={styles.gridList}>
                {
                    movies.map((movie) => {
                        return <MovieItem key={`movie-${movie.id}`} movie={movie} onClick={this.showMovieDetail.bind(this)} />
                    })
                }
                </GridList>
            </div>
        )
    }
}

export default MovieListView