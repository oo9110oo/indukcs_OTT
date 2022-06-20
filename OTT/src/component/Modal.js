// 영화 상세정보 모달
import React, {useState, useRef} from 'react'
import Backdrop from '../component/Backdrop'
import { ReactComponent as AddLogo } from '../static/images/add.svg'
import { ReactComponent as PlayLogo } from '../static/images/play-button.svg'

import ReactPlayer from 'react-player'

const Modal = ({ show, modalClosed, children, backgroundImage }) => {
  const backgroundStyle = {
    backgroundSize: 'cover',
    backgroundImage: `url(https://image.tmdb.org/t/p/original/${backgroundImage})`,
  }

  const [movieInput, setMovieInput] = useState([])

  const movieNumber = useRef(0)

  const addMovie = (movie) => {
    let movies = localStorage.getItem('list'); // movieList에 저장된 영화 개수
    var check = true; // 이미 저장된 영화인지 확인용 변수
    localStorage.setItem('checkMovie', JSON.stringify([children['props']['movie']])) // 저장된 영화인지 확인하기 위한 임시 저장
    if(movies != null){ // 저장된 영화인지 확인
      for (let i = 0; i <= movies; i++) {
        if(localStorage.getItem(i) != null) {
          if(JSON.parse(localStorage.getItem('checkMovie'))[0]['backdrop_path'] == JSON.parse(localStorage.getItem(i))[0]['backdrop_path']){
            check = false;
          }
        }
      }
    }    

    if(check == true) {
      movieNumber.current += 1;
      setMovieInput([movie, ...movieInput])
      localStorage.getItem('list') === null ? localStorage.setItem('list', 1) : localStorage.setItem('list', parseInt(localStorage.getItem('list'))+1)
      //localStorage.setItem(localStorage.getItem('list'), JSON.stringify([children['props']['movie']['title'],children['props']['movie']['release_date'],children['props']['movie']['overview']]))    
      localStorage.setItem(localStorage.getItem('list'), JSON.stringify([children['props']['movie']]))    
    
      var flag = true;      

      if (flag) {
        movieNumber.current += 1;
        setMovieInput([movie, ...movieInput])
      }

      alert("My List에 저장했습니다")  
    }
    else alert("이미 My List에 있는 영화입니다.")
  }

  return (
      <div>
          <div>
          <Backdrop show={show} toggleBackdrop={modalClosed} />
          <div
            style={backgroundStyle}
            className={show ? 'modal show' : 'modal hide'}
          >
            <div className='modal__container'>
              <h1 className='modal__title'>{children['props']['movie']['title'] || children['props']['movie']['name']}</h1>
              <p className='modal__info'>
                <span className='modal__rating'>Rating: {children['props']['movie']['vote_average'] * 10}% </span>
                Release date: { children['props']['movie']['release_date'] != null?
                                children['props']['movie']['release_date'] :
                                children['props']['movie']['first_air_date']} 
              </p>       
              <p className='modal__overview'>{children['props']['movie']['overview']}</p>              
                       
              <button className='modal__btn modal__btn--red'>
                Play
              </button>
              <button  className='modal__btn'
                onClick={ () => {                   
                  addMovie(children['props']['movie']) } }>
                <AddLogo className='header__container-btnMyList-add' />
                My List
              </button>
            </div>
          </div>
        </div>
      </div>
  )

}

export default Modal