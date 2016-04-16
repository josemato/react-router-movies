let defaultState = {
    movies: [],
    orderBy: 'year',
    loading: false
};

const STORE_NAME = 'MovieListViewStore'

class MovieListViewStore {
    static saveState(newState) {
        let state = newState || defaultState
        
        sessionStorage.setItem(STORE_NAME, JSON.stringify(state))
    }
    
    static getState() {
        let state = defaultState
        
        try {
            let savedState = JSON.parse(sessionStorage.getItem(STORE_NAME))
            
            if(savedState) {
                state = savedState
            }
            
        } catch(e) {
            
        }
        
        return state
    }
}

export default MovieListViewStore