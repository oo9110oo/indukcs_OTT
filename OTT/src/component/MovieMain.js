import React, { useState } from 'react'

import { ReactComponent as PlayLogo } from '../static/images/play-button.svg'
import { ReactComponent as AddLogo } from '../static/images/add.svg'
import { ReactComponent as MuteIcon } from '../static/images/mute.svg'
import { ReactComponent as UnmuteIcon } from '../static/images/unmute.svg'
import ReactPlayer from 'react-player'

// const Moviemain = ({ movie: { name, overview } }) => {
  
const Moviemain = () => {
  const [isMuted, setIsMuted] = useState(true)

  return (
    <div className='MovieMain'>
      <ReactPlayer
        playing={true}
        loop={true}
        width='100%'
        height='100%'
        volume={1}
        muted={isMuted}
        className='header__video'
        url='https://vimeo.com/636702859'
      />
      <h1 className='header__container-heading'>Docter Strange</h1>
      <button
        onClick={() => alert('not a movie!')}
        className='header__container-btnPlay'
      >
        <PlayLogo className='header__container-btnMyList-play' />
        Play
      </button>
      <button className='header__container-btnMyList'>
        <AddLogo className='header__container-btnMyList-add' />
        My List
      </button>

      {isMuted ? (
        <MuteIcon
          onClick={() => setIsMuted(false)}
          className='header__container-btnVolume'
        />
      ) : (
        <UnmuteIcon
          onClick={() => setIsMuted(true)}
          className='header__container-btnVolume'
        />
      )}
      <p className='header__container-overview'>Overview</p>
      <div className='header__container--fadeBottom'></div>
    </div>
  )
}

export default Moviemain
