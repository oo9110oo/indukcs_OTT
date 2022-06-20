// 메인 페이지 컴포넌트
import React, { useState } from 'react'
import Body from '../component/Body'

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

  // 영화 상세정보 모달과 영화 정보 표시
  return (
    <>
      <div className='main-content'>
        <Body selectMovieHandler={selectMovieHandler} />
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
