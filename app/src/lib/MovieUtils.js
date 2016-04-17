const ORDER_BY_YEAR = 'year'
const ORDER_BY_TITLE = 'title'
const ORDER_BY_RATING = 'rating'

class MovieUtilsPrivate {
    /** 
     *  
     * rating is a float string like "3.8" 
     */
    static orderByRating(movies) {
        return movies.sort((movie1, movie2) => {
            return (movie1.rating * 100 - movie2.rating * 100)
        })
    }
    
    /**
     * 
     */
    static orderByTitle(movies) {
        return movies.sort((movie1, movie2) => {
            if (movie1.title > movie2.title) {
                return 1;
            }

            if (movie1.title < movie2.title) {
                return -1;
            }

            return 0;
        })
    }
    
    static orderByYear(movies) {
        return movies.sort((movie1, movie2) => {
            return (movie1.year - movie2.year)
        })
    }
}

class MovieUtils {
    static get ORDER_BY_YEAR() {
        return 'year'
    }
    
    static get ORDER_BY_TITLE() {
        return ORDER_BY_TITLE
    }
    
    static get ORDER_BY_RATING() {
        return ORDER_BY_RATING
    }
    
    static orderBy(field, movies) {
        let orderedMovies = []

        switch(field) {
            case ORDER_BY_RATING:
                orderedMovies = MovieUtilsPrivate.orderByRating(movies)
                break
            case ORDER_BY_TITLE:
                orderedMovies = MovieUtilsPrivate.orderByTitle(movies)
                break
            case ORDER_BY_YEAR:
                orderedMovies = MovieUtilsPrivate.orderByYear(movies)
                break
            default:
                orderedMovies = movies
                break
        }
        
        return orderedMovies
    }
}

export default MovieUtils