import axios from '../../axios-movies'
import dummy from "../../db/data.json"

export const FETCH_TRENDING = 'FETCH_TRENDING'
export const FETCH_NETFLIX_ORIGINALS = 'FETCH_NETFLIX_ORIGINALS'
export const FETCH_TOP_RATED = 'FETCH_TOP_RATED'
export const FETCH_ACTION_MOVIES = 'FETCH_ACTION_MOVIES'
export const FETCH_COMEDY_MOVIES = 'FETCH_COMEDY_MOVIES'
export const FETCH_HORROR_MOVIES = 'FETCH_HORROR_MOVIES'
export const FETCH_ROMANCE_MOVIES = 'FETCH_ROMANCE_MOVIES'
export const FETCH_DOCUMENTARIES = 'FETCH_DOCUMENTARIES'
// movie details
export const FETCH_MOVIE_DETAILS = 'FETCH_MOVIE_DETAILS'
export const FETCH_MOVIE_DETAILS_SUCCESS = 'FETCH_MOVIE_DETAILS_SUCCESS'
export const FETCH_MOVIE_DETAILS_FAIL = 'FETCH_MOVIE_DETAILS_FAIL'
// search
export const FETCH_SEARCH_MOVIE = 'FETCH_SEARCH_MOVIE'
export const FETCH_SEARCH_MOVIE_FAIL = 'FETCH_SEARCH_MOVIE_FAIL'
export const FETCH_SEARCH_MOVIE_SUCCESS = 'FETCH_SEARCH_MOVIE_SUCCESS'


const media_type = {
  tv: 'tv',
  movie: 'movie',
}
const API_KEY = "c22413846bd67d4a254755774966a82b";

export const fetchMovieDetails = (mediaType, mediaId) => {
  return async (dispatch) => {
    try {
      
      // dispatch({ type: FETCH_MOVIE_DETAILS })
      // //let urlPath
      // //if (mediaType === media_type.movie)
      // //  urlPath = `/movie/${mediaId}?api_key=`+API_KEY
      // //if (mediaType === media_type.tv)
      // //  urlPath = `/tv/${mediaId}?api_key=`+API_KEY

      // //const request = await axios.get(urlPath)
      // //console.log(dummy["MovieDetails"])
      // //console.log(request.data)
      // dispatch({ type: FETCH_MOVIE_DETAILS_SUCCESS, payload: dummy["MovieDetails"] })


      var unionDummy = [];
      for(var key in dummy) {
        if(dummy[key]["searchTarget"]){
          unionDummy = unionDummy.concat(dummy[key]["results"])
        }
      }
      var resultData = [];
      for(var index in unionDummy) {
        if(unionDummy[index]["id"] == mediaId){//unionDummy[index]["media_type"] == mediaType && 
          resultData = resultData.concat(unionDummy[index]);
        }
      }
      if(resultData.length > 0){
        dispatch({ type: FETCH_MOVIE_DETAILS_SUCCESS, payload: resultData[0] })
      } else {
        dispatch({ type: FETCH_MOVIE_DETAILS_FAIL })
      }
    } catch (error) {
      console.log('error', error)
      dispatch({ type: FETCH_MOVIE_DETAILS_FAIL })
    }
  }
}

export const fetchSearchMovie = (searchTerm) => {
  return async (dispatch) => {
    try {
      // dispatch({ type: FETCH_SEARCH_MOVIE })
      // const request = await axios.get(
      //   `/search/movie?api_key=c22413846bd67d4a254755774966a82b&query=${searchTerm}`        
      // )
      //dispatch({ type: FETCH_SEARCH_MOVIE_SUCCESS, payload: request.data.results })
      
      var unionDummy = [];
      for(var key in dummy) {
        if(dummy[key]["searchTarget"]){
          unionDummy = unionDummy.concat(dummy[key]["results"])
        }
      }
      var resultData = [];
      for(var index in unionDummy) {
        if(JSON.stringify(unionDummy[index]).toUpperCase().indexOf(searchTerm.toUpperCase()) != -1) {
          resultData = resultData.concat(unionDummy[index]);
        }
      }
      dispatch({ type: FETCH_SEARCH_MOVIE_SUCCESS, payload: resultData })
    } catch (error) {
      dispatch({ type: FETCH_SEARCH_MOVIE_FAIL })
      console.log('error', error)
    }
  }
}

export const fetchNetflixOriginals = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_NETFLIX_ORIGINALS, payload: dummy["NetflixOriginals"] })
    } catch (error) {
      console.log('error', error)
    }
  }
}

export const fetchTrending = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_TRENDING, payload: dummy["Trending"] })
    } catch (error) {}
  }
}

export const fetchTopRated = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_TOP_RATED, payload: dummy["TopRated"] })
    } catch (error) {}
  }
}

export const fetchActionMovies = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_ACTION_MOVIES, payload: dummy["ActionMovies"] })
    } catch (error) {}
  }
}

export const fetchComedyMovies = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_COMEDY_MOVIES, payload: dummy["ComedyMovies"] })
    } catch (error) {}
  }
}

export const fetchHorrorMovies = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_HORROR_MOVIES, payload: dummy["HorrorMovies"] })
    } catch (error) {}
  }
}

export const fetchRomanceMovies = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_ROMANCE_MOVIES, payload: dummy["RomanceMovies"] })
    } catch (error) {}
  }
}

export const fetchDocumentaries = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_DOCUMENTARIES, payload: dummy["Documentaries"] })
    } catch (error) {}
  }
}
