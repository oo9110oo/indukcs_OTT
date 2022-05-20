import React, { useState } from 'react'
import { Provider } from 'react-redux'

import Body from '../component/Body'
import Body2 from '../component/Body2'

import Modal from '../component/Modal'
import ModalMovie from '../component/MovieModal'

const Home = () => {
  const [toggleModal, setToggleModal] = useState(false)
  const [movieDetails, setMovieDetails] = useState({})

  const selectMovieHandler = async (movie) => {
    setToggleModal(true)
    setMovieDetails(movie)
  }

  const closeModal = () => {
    setToggleModal(false)
  }

  return (
    <>
      <div className='main-content'>

        <Body2 selectMovieHandler={selectMovieHandler} />
        {/* <Body2 /> */}

      </div>
      <Modal
        show={toggleModal}
        modalClosed={closeModal}
        backgroundImage={movieDetails.backdrop_path || movieDetails.poster_path}
      >
        <ModalMovie movie={movieDetails} />
      </Modal>
    </>
  )
}

export default Home
