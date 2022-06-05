import React, { useState, useEffect } from 'react'
import "../static/scss/movieList.scss"

const MovieList = () => {
  

const rendering = () => {
  let movies = localStorage.getItem('list');
  console.log(movies);
  const result = [];
  for (let i = 0; i <= movies; i++) {
    console.log("???");
    const title = JSON.parse(localStorage.getItem(i))[0]['title']
    const imagePath = 'https://image.tmdb.org/t/p/original/' + JSON.parse(localStorage.getItem(i))[0]['backdrop_path'];
    console.log(imagePath);

    result.push(<div key={title}>
    <img className='movieShowcase__container--movie-image' src={imagePath} style={{width:'200px'}} />
                <h5 className='movieName'>{title}</h5>
                </div>
    );
  }
  return result;
};



  return (
     <div className='detail-menu-modal'>
       <h1 className='modal__title'>My List</h1>         
      <div style={{display:'flex'}}>{rendering()}</div>
    </div>
  )
}

export default MovieList