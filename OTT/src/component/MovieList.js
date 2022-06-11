import React, { useState, useEffect } from 'react'
import "../static/scss/movieList.scss"

const MovieList = () => {  

  const listDelete = (e) => {
    if(window.confirm("정말 삭제하시겠습니까?")) {
      localStorage.removeItem(e)
      window.location.reload();
    }
    
  }

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
        if(localStorage.getItem(i) != null) {
          const title = JSON.parse(localStorage.getItem(i))[0]['title'] || JSON.parse(localStorage.getItem(i))[0]['name'];
          const imagePath = 'https://image.tmdb.org/t/p/original/' + JSON.parse(localStorage.getItem(i))[0]['backdrop_path'];
          result.push(<div className='addMovieList' key={title}>          
            <img className='movieShowcase__container--movie-image' src={imagePath} style={{width:'200px'}} />
            <button className='deleteIcon' value={i} onClick={(e) => listDelete(e.target.value)}></button>
            <h5 className='movieName'>{title}</h5>
            </div>
          );
        }
      }
      
    return result;
    }
    
  };



    return (
      <div className='detail-menu-modal'>
        
        <h3 className='modal__title'>My List</h3>    
        <div>          
          <div className='imageList'>{rendering()}</div>
        </div>          
        
      </div>
    )
}

export default MovieList