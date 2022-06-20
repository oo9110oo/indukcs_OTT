import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "../static/scss/movieList.scss"

const MovieList = ({}) => {
  const navigate = useNavigate()

  const listDelete = async (e) => {
    const movies = localStorage.getItem('list')

    if (window.confirm("정말 삭제하시겠습니까?")) {
      for (let i = e; i < movies; i++) {
        localStorage.setItem(i, localStorage.getItem(i + 1))
      }
      localStorage.removeItem(movies)
      localStorage.setItem('list', parseInt(localStorage.getItem('list')) - 1)

      const serachText = window.location.href.split('search')[1]
      if (serachText == undefined) navigate('/')
      else navigate('search' + serachText); // 새로고침. 새로고침 안하면 화면이 그대로 남아있어서

    }
  }

  const rendering = () => {
    let movies = localStorage.getItem('list') // myList에 저장된 영상 개수
    const result = []
    if (movies == null || parseInt(movies) <= 0) {
      localStorage.setItem('list', 0)
      result.push(
        <div key='none'>
          <h3>
            My List가 비어있습니다.<br /><br />
            관심 있는 컨텐츠를 My List에 추가해 주세요!
          </h3>
        </div>)
      return result
    } else {
      for (let i = 0; i <= movies; i++) { // 저장된 영상들의 key는 다 숫자임
        if (localStorage.getItem(i + 1) != null) { // 영상 데이터 있는지 확인
          const title = JSON.parse(localStorage.getItem(i + 1))[0]['title'] || JSON.parse(localStorage.getItem(i + 1))[0]['name']
          // 영상들 중에서 제목이 title에 저장되는거랑 name에 저장되는게 있어서 둘 중 하나만 있어도 가져오도록 설정
          const imagePath = 'https://image.tmdb.org/t/p/original/' + JSON.parse(localStorage.getItem(i + 1))[0]['backdrop_path']
          result.push(
            <div className='addMovieList' key={title}>
              <img className='movieShowcase__container--movie-image' src={imagePath} style={{ width: '200px' }} />
              <button className='deleteIcon' value={i + 1} onClick={(e) => listDelete(parseInt(e.target.value))}></button>
              <h5 className='movieName'>{title}</h5>
            </div>
          )
        }
      }

      return result
    }

  }

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