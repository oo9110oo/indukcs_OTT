import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import * as movieActions from '../store/actions'

import MovieMain from './MovieMain'
import MovieGroup from './MovieGroup'

const MainContent = ({ selectMovieHandler }) => {
  const { movieDetails } = useSelector((state) => state.movieDetails)
  const netflixOriginals = useSelector((state) => state.netflixOriginals)
  const trending = useSelector((state) => state.trending)
  const topRated = useSelector((state) => state.topRated)
  const actionMovies = useSelector((state) => state.action)
  const comedyMovies = useSelector((state) => state.comedy)
  const horrorMovies = useSelector((state) => state.horror)
  const romanceMovies = useSelector((state) => state.romance)
  const documentaries = useSelector((state) => state.documentary)

  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(movieActions.fetchMovieDetails('tv', '63351'))
  //   dispatch(movieActions.fetchNetflixOriginals())
  //   dispatch(movieActions.fetchTrending())
  //   dispatch(movieActions.fetchTopRated())
  //   dispatch(movieActions.fetchActionMovies())
  //   dispatch(movieActions.fetchComedyMovies())
  //   dispatch(movieActions.fetchHorrorMovies())
  //   dispatch(movieActions.fetchRomanceMovies())
  //   dispatch(movieActions.fetchDocumentaries())
  // }, [dispatch])

  return (
    <div className='container'>
      <MovieMain movie={movieDetails} />
      <div className='movieShowcase'>
        <MovieGroup
          isNetflixMovies={true}
          title='Netflix Originals'
          selectMovieHandler={selectMovieHandler}
          movies={netflixOriginals.data}
        />
        <MovieGroup
          title='Trending'
          selectMovieHandler={selectMovieHandler}
          movies={trending.data}
        />
        <MovieGroup
          title='Top Rated'
          selectMovieHandler={selectMovieHandler}
          movies={topRated.data}
        />
        <MovieGroup
          title='Action Movies'
          selectMovieHandler={selectMovieHandler}
          movies={actionMovies.data}
        />
        <MovieGroup
          title='Comedy'
          selectMovieHandler={selectMovieHandler}
          movies={comedyMovies.data}
        />
        <MovieGroup
          title='Horror Movies'
          selectMovieHandler={selectMovieHandler}
          movies={horrorMovies.data}
        />
        <MovieGroup
          title='Romance'
          selectMovieHandler={selectMovieHandler}
          movies={romanceMovies.data}
        />
        <MovieGroup
          title='Documentaries'
          selectMovieHandler={selectMovieHandler}
          movies={documentaries.data}
        />
      </div>
    </div>
  )
}

export default MainContent
