import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as movieAddList from '../component/Modal'



const MovieList = () => {
    const dispatch = useDispatch()
    //console.log(dispatch(movieAddList.movieList()));
    console.log(useSelector((state) => state.movieList));
  return (
     <div className='modal__container'>
       {/* <h1 className='modal__title'>{title}</h1>
       <p className='modal__info'>
         <span className='modal__rating'>Rating: {vote_average * 10}% </span>
         Release date: {release_date} 
       </p>
       <p className='modal__overview'>{overview}</p>       */}
    </div>
  )
}

export default MovieList