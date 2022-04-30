import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import ModalMovieDetails from '../components/ModalMovieDetails'
import Modal from '../components/UI/Modal'
import { useDebounce } from '../hooks/useDebounce'
import * as movieActions from '../store/actions'

// A custom hook that builds on useLocation to parse
// the query string for you.
const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const Search = () => {
  let query = useQuery()
  const debouncedSearchTerm = useDebounce(query.get('q'), 500)
  const [isToggleModal, setIsToggleModal] = useState(false)
  const { searchResults, isLoading } = useSelector((state) => state.searchMovie)
  const { movieDetails } = useSelector((state) => state.movieDetails)
  const dispatch = useDispatch()

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(movieActions.fetchSearchMovie(debouncedSearchTerm))
    }
  }, [debouncedSearchTerm])

  const onCloseModalHandler = () => {
    setIsToggleModal(false)
  }

  const onSelectMovieHandler = (movie) => {
    dispatch(movieActions.fetchMovieDetails(movie.media_type, movie.id))
    setIsToggleModal(true)
  }

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <>
        <div className='search-container'>
          {searchResults.map((movie) => {
            if (movie.backdrop_path !== null && movie.media_type !== 'person') {
              const movieImageUrl =
                'https://image.tmdb.org/t/p/w500' + movie.backdrop_path
              return (
                <div className='movie'>
                  <div
                    onClick={() => onSelectMovieHandler(movie)}
                    className='movie__column-poster'
                  >
                    <img src={movieImageUrl} alt='' className='movie__poster' />
                  </div>
                </div>
              )
            }
          })}
        </div>
        <Modal
          show={isToggleModal}
          modalClosed={onCloseModalHandler}
          backgroundImage={
            movieDetails.backdrop_path || movieDetails.poster_path
          }
        >
          <ModalMovieDetails movie={movieDetails} />
        </Modal>
      </>
    ) : (
      <div className='no-results'>
        <div className='no-results__text'>
          <p>
            Your search for "{debouncedSearchTerm}" did not have any matches.
          </p>
          <p>Suggestions:</p>
          <ul>
            <li>Try different keywords</li>
            <li>Looking for a movie or TV show?</li>
            <li>Try using a movie, TV show title, an actor or director</li>
            <li>Try a genre, like comedy, romance, sports, or drama</li>
          </ul>
        </div>
      </div>
    )
  }

  return !isLoading ? renderSearchResults() : <h1>Loading...</h1>
}

export default Search
