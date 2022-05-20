import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPlayer from 'react-player'

import MovieMain from './MovieMain'
import MovieGroup from './MovieGroup'
import { ReactComponent as MuteIcon } from '../static/images/mute.svg'
import { ReactComponent as UnmuteIcon } from '../static/images/unmute.svg'

const Body = () => {
//    const movieDetails  = useSelector((state) => state.movieDetails)
    const [isMuted, setIsMuted] = useState(true)

    console.log('body content')
    return (
        <div className='container'>
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
        <div className='movieGroup'>
            <p>movieGroup</p>
        </div>

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

      </div>
    )
}

export default Body
