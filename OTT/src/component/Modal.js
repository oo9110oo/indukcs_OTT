import React, {useState, useRef} from 'react'
import Backdrop from '../component/Backdrop'
import { ReactComponent as AddLogo } from '../static/images/add.svg'
import { ReactComponent as PlayLogo } from '../static/images/play-button.svg'

const Modal = ({ show, modalClosed, children, backgroundImage }) => {
  const backgroundStyle = {
    backgroundSize: 'cover',
    backgroundImage: `url(https://image.tmdb.org/t/p/original/${backgroundImage})`,
  }

  const [movieInput, setMovieInput] = useState([]);

  const movieNumber = useRef(0);

  const addMovie = (movie) => {
    let movies = localStorage.getItem('list');
    var check = true;
    localStorage.setItem('checkMovie', JSON.stringify([children['props']['movie']]))
    if(movies != null){
      for (let i = 0; i <= movies; i++) {
        if(JSON.parse(localStorage.getItem('checkMovie'))[0]['backdrop_path'] == JSON.parse(localStorage.getItem(i))[0]['backdrop_path']){
          check = false;
        }      
      }
    }    

    if(check == true) {
      movieNumber.current += 1;
      setMovieInput([movie, ...movieInput])
      localStorage.getItem('list') === null ? localStorage.setItem('list', 0) : localStorage.setItem('list', parseInt(localStorage.getItem('list'))+1)
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
                Release date: {children['props']['movie']['release_date']} 
              </p>
              {/* <p className='modal__episode'>
                {number_of_episodes ? ' Episodes: ' + number_of_episodes : ''}
                {number_of_seasons ? ' Seasons: ' + number_of_seasons : ''}
              </p> */}              
              <p className='modal__overview'>{children['props']['movie']['overview']}</p>              
                       
              <button className='modal__btn modal__btn--red'>
                <PlayLogo className='header__container-btnMyList-play' />
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