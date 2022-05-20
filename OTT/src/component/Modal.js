import React from 'react'


const Modal = ({ show, modalClosed, children, backgroundImage }) => {
  const backgroundStyle = {
    backgroundSize: 'cover',
    backgroundImage: `url(https://image.tmdb.org/t/p/original/${backgroundImage})`,
  }

  return (
      <div>
          Modal Pages
      </div>
  )

}

export default Modal
