import React, { useState, useEffect } from 'react'
import "../static/scss/movieList.scss"

const MovieList = () => {  

  const listDelete = (e) => {
    if(window.confirm("정말 삭제하시겠습니까?")) {
      localStorage.removeItem(e)      
      window.location.reload(); // 새로고침. 새로고침 안하면 화면이 그대로 남아있어서
    }
    
  }

  const rendering = () => {
    let movies = localStorage.getItem('list'); // myList에 저장된 영상 개수
    const result = [];
    if (movies == null) {
      result.push(<div>
        <h3>myList가 비어있습니다.</h3>
      </div>)
      return result;
    } else {
      for (let i = 0; i <= movies; i++) { // 저장된 영상들의 key는 다 숫자임
        if(localStorage.getItem(i) != null) { // 영상 데이터 있는지 확인
          const title = JSON.parse(localStorage.getItem(i))[0]['title'] || JSON.parse(localStorage.getItem(i))[0]['name'];
          // 영상들 중에서 제목이 title에 저장되는거랑 name에 저장되는게 있어서 둘 중 하나만 있어도 가져오도록 설정
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