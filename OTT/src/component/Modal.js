import React from 'react'
import Backdrop from '../component/Backdrop'
import AddIcon from '../static/images/add.svg'
import PlayIcon from '../static/images/play-button.svg'

const Modal = ({ show, modalClosed, children, backgroundImage }) => {
  const backgroundStyle = {
    backgroundSize: 'cover',
    backgroundImage: `url(https://image.tmdb.org/t/p/original/${backgroundImage})`,
  }

  console.log(children)
  

  return (
      <div>
          <div>
          <Backdrop show={show} toggleBackdrop={modalClosed} />
          <div
            style={backgroundStyle}
            className={show ? 'modal show' : 'modal hide'}
          >
            <div className='modal__container'>
              <h1 className='modal__title'>{children['props']['movie']['title']}</h1>
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
                {/* <PlayIcon className='modal__btn--icon' /> */}
                Play
              </button>
              <button className='modal__btn'>
                {/* <AddIcon className='modal__btn--icon' /> */}
                My List
              </button>
            </div>
          </div>
        </div>
      </div>
  )

}

export default Modal
