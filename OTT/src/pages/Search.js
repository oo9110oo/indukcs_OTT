import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import MovieModal from '../component/MovieModal'
import Modal from '../component/Modal'
import { useDebounce } from '../hook/useDebounce'
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
          <MovieModal movie={movieDetails} />
        </Modal>
      </>
    ) : (
      <div className='no-results'>
        <div className='no-results__text'>
          <p>
            찾으시는 "{debouncedSearchTerm}" 에 대한 결과가 없습니다.
          </p>
          <p>해결 방안</p>
          <ul>
            <li>다른 키워드를 사용해 보세요.</li>
            <li>영화나 TV 프로그램을 찾고 계신가요?</li>
            <li>영화 또는 TV 프로그램의 제목, 배우, 감독을 통해 검색해 주세요.</li>
            <li>Comedy, Romance와 같이 장르로 검색해 보세요.</li>
          </ul>
        </div>        
      </div>
    )
  }

  return !isLoading ? renderSearchResults() : <h1>Loading...</h1>
}

export default Search
