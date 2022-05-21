import React from 'react'

import MovieMain from './MovieMain'
import MovieGroup from './MovieGroup'
import dummy from "../db/data.json";

const Body = () => {
    console.log(dummy)
    console.log(dummy["NetflixOriginals"])
    console.log(dummy["tv"])
    
    return (
        <div className='container'>
            <MovieMain movie={null} />
            <div className='movieShowcase'>
                <MovieGroup
                  isNetflixMovies={true}
                  title='Netflix Originals'
                  selectMovieHandler={null}
                  movies={dummy["NetflixOriginals"]["results"]}
                />
                <MovieGroup
                    title='Trending'
                    selectMovieHandler={null}
                    movies={dummy["Trending"]["results"]}
                />
                <MovieGroup
                    title='Top Rated'
                    selectMovieHandler={null}
                    movies={dummy["TopRated"]["results"]}
                />
                <MovieGroup
                    title='Action Movies'
                    selectMovieHandler={null}
                    movies={dummy["ActionMovies"]["results"]}
                />
                <MovieGroup
                    title='Comedy'
                    selectMovieHandler={null}
                    movies={dummy["ComedyMovies"]["results"]}
                />
                <MovieGroup
                    title='Horror Movies'
                    selectMovieHandler={null}
                    movies={dummy["HorrorMovies"]["results"]}
                />
                <MovieGroup
                    title='Romance'
                    selectMovieHandler={null}
                    movies={dummy["RomanceMovies"]["results"]}
                />
                <MovieGroup
                    title='Documentaries'
                    selectMovieHandler={null}
                    movies={dummy["Documentaries"]["results"]}
                />
            </div>
            {/* <div className='movieGroup'>
                <p>movieGroup</p>
            </div> */}
        </div>
    )
}

export default Body
