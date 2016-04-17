import React, { Component } from 'react'
import browserHistory from 'react-router/lib/browserHistory'
import MovieListViewStore from '../store/MovieListViewStore'
import TabOrderBy from './TabOrderBy'
import MovieItem from './MovieItem'
import MovieService from '../services/MovieService'
import MovieUtils from '../lib/MovieUtils'

import AppBar from 'material-ui/lib/app-bar'
import GridList from 'material-ui/lib/grid-list/grid-list'
import RefreshIndicator from 'material-ui/lib/refresh-indicator'
import IconButton from 'material-ui/lib/icon-button'
import RefreshButton from 'material-ui/lib/svg-icons/navigation/refresh'

const styles = {
    contentWrapper: {
        position: 'relative'
    },
    refreshWrapper: {
        position: 'relative',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '70vh'
    },
    listGridWrapper: {
        
    },
    gridList: {
        width: '100%',
        marginBottom: 24,
    },
    refresh: {
        display: 'inline-block',
        position: 'relative'
    }
}

class MovieListView extends Component {
    constructor(props) {
        super(props)
        
        this.state = MovieListViewStore.getState()
    }
    
    componentDidMount() {
        this.loadMovies()
    }
    
    loadMovies() {
        this.setState({
            loading: true
        })
        
        let fromCache = false
        MovieService.fetchMovies(fromCache).then((movies) => {
            this.setState({
                movies: MovieUtils.orderBy(this.state.orderBy, movies),
                loading: false
            })
        }).catch((err) => {
            this.setState({
                loading: false
            })
            
            console.error('err fetching movies', err)
        })
    }
    
    onOrderByClick(orderBy) {
        if(orderBy === this.state.orderBy) {
            return
        }
        
        this.setState({
            movies: MovieUtils.orderBy(orderBy, this.state.movies),
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
        let movies = this.state.movies

        const refreshButton = (
            <IconButton touch={true} onFocus={this.loadMovies.bind(this)}>
                <RefreshButton />
            </IconButton>
        )

        return (
            <div>
                <AppBar 
                    title="Movies App"
                    iconElementRight={refreshButton} 
                    onRightIconButtonTouchTap={this.loadMovies.bind(this)} 
                    showMenuIconButton={false} />
                
                <div>
                    <TabOrderBy selected={this.state.orderBy === MovieUtils.ORDER_BY_YEAR}  onClick={this.onOrderByClick.bind(this)} text="Year" orderBy={MovieUtils.ORDER_BY_YEAR} />
                    <TabOrderBy selected={this.state.orderBy === MovieUtils.ORDER_BY_TITLE} onClick={this.onOrderByClick.bind(this)} text="Title" orderBy={MovieUtils.ORDER_BY_TITLE} />
                    <TabOrderBy selected={this.state.orderBy === MovieUtils.ORDER_BY_RATING} onClick={this.onOrderByClick.bind(this)} text="Rating" orderBy={MovieUtils.ORDER_BY_RATING} />
                </div>
                
                <div style={styles.contentWrapper}>
                    {
                        this.state.loading ?
                            <div style={styles.refreshWrapper}>
                                <RefreshIndicator
                                    size={50}
                                    left={0}
                                    top={0}
                                    status="loading"
                                    percentage={60}
                                    style={styles.refresh} />
                            </div>
                            :
                            <div style={styles.listGridWrapper}>
                                <GridList cellHeight={200} style={styles.gridList}>
                                {
                                    movies.map((movie) => {
                                        return <MovieItem key={`movie-${movie.id}`} movie={movie} onClick={this.showMovieDetail.bind(this)} />
                                    })
                                }
                                </GridList>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

export default MovieListView