import React, { useState, useEffect } from 'react'
import "../static/scss/movieList.scss"

const MovieList = () => {  

  const rendering = () => {
    let movies = localStorage.getItem('list');
    const result = [];
    if (movies == null) {
      result.push(<div>
        <h3>myList가 비어있습니다.</h3>
      </div>)
      return result;
    } else {
      for (let i = 0; i <= movies; i++) {
        const title = JSON.parse(localStorage.getItem(i))[0]['title']
        const imagePath = 'https://image.tmdb.org/t/p/original/' + JSON.parse(localStorage.getItem(i))[0]['backdrop_path'];
        result.push(<div key={title}>
          <img className='movieShowcase__container--movie-image' src={imagePath} style={{width:'200px'}} />
          <h5 className='movieName'>{title}</h5>
          </div>
        );
      }
      
    return result;
    }
    
  };



    return (
      <div className='detail-menu-modal'>
        
        <h1 className='modal__title'>My List</h1>              
        <div className='imageList'>{rendering()}</div>
        
      </div>
    )
}

export default MovieList