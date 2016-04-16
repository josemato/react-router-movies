import 'whatwg-fetch'

let cachedMovies = null

class MovieService {
    static fetchMovies(fromCache) {
        return new Promise((resolve, reject) => {
            if(cachedMovies && fromCache) {
                return resolve(cachedMovies)
            }
            
            fetch('http://beta.json-generator.com/api/json/get/V1jWvOGyb', {
                method: 'get', 
                mode: 'cors'
            }).then((response) => {
                return response.json()
            }).then((movies) => {
                // create custom movie data model
                if(Array.isArray(movies)) {
                    cachedMovies = movies.map((movie) => {
                        movie.actors = movie.actors.split(',')
                        movie.titleSlug = movie.title.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')
                        
                        return movie
                    })
                    
                    return resolve(cachedMovies)
                }
                
                return resolve([])
            }).catch((err) => {
                return reject(err)
            })
        })
        
    }
    
    static searchMovieById(movieId) {
        return new Promise((resolve, reject) => {
            let fromCache = true
            MovieService.fetchMovies(fromCache).then((movies) => {
                let searchedMovie = null
                
                movies.some((movie) => {
                    if(movie.id == movieId) {
                        searchedMovie = movie
                        return true
                    }

                    return false 
                })
                
                return resolve(searchedMovie)
            }).catch((err) => {
                return reject(null)
            })              
        })
    }
}

export default MovieService