import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'
import MovieService from '../services/MovieService'

import AppBar from 'material-ui/lib/app-bar'
import Card from 'material-ui/lib/card/card'
import CardMedia from 'material-ui/lib/card/card-media'
import CardTitle from 'material-ui/lib/card/card-title'
import CardText from 'material-ui/lib/card/card-text'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import IconButton from 'material-ui/lib/icon-button';
import BackAction from 'material-ui/lib/svg-icons/navigation/arrow-back'

class MovieDetailView extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            movie: null
        }
    }
    
    componentDidMount() {
        let movieId = this.props.params ? this.props.params.id : 0
        
        if(movieId) {
            MovieService.searchMovieById(movieId).then((movie) => {
                this.setState({
                    movie: movie
                })
            }).catch((err) => {
                console.error('err fetching movie', err)
            })
        }
    }
    
    onGoBackClick() {
        browserHistory.push('/movies')
    }
    
    render() {
        let movie = this.state.movie
        
        if(!movie) {
            return null
        }
        
        const goBackButton = (
            <IconButton touch={true} 
                onTouchStart={this.onGoBackClick.bind(this)}
                onFocus={this.onGoBackClick.bind(this)}>
                <BackAction />
            </IconButton>
        )
        
        return (
            <div>
                <AppBar 
                    title={movie.title}
                    iconElementLeft={goBackButton} 
                    onLeftIconButtonTouchTap={this.onGoBackClick.bind(this)} 
                    showMenuIconButton={true} />
                
                <Card>
                    <CardMedia overlay={<CardTitle title={movie.title} subtitle={`Year ${movie.year} - Rating: ${movie.rating}`} />}>
                        <img src={movie.poster} />
                    </CardMedia>
                    <CardTitle title="Summary" subtitle={`Director: ${movie.director}`} />
                    <CardText>{movie.summary}</CardText>
                    
                    <List subheader="Actors">
                    {
                        movie.actors.map((actor, i) => {
                            return <ListItem key={`actor-${i}`} primaryText={actor} />
                        })
                    }
                    </List>
                </Card>
            </div>
        )
    }
}

export default MovieDetailView