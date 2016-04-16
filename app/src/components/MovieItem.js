import React, { Component } from 'react'

import GridTile from 'material-ui/lib/grid-list/grid-tile'

class MovieItem extends Component {
    constructor(props) {
        super(props)    
    }
    
    onMovieClick(e) {
        this.props.onClick(this.props.movie)
    }
    
    render() {
        let movie = this.props.movie
        
        return (
            <GridTile
                key={movie.poster}
                title={movie.title}
                subtitle={`${movie.year} - ${movie.rating}`} 
                onClick={this.onMovieClick.bind(this)}>
                <img src={movie.poster} width="100" />
            </GridTile>
        )
    }
}

export default MovieItem