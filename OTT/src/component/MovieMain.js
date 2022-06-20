// 메인 화면 맨 위 영화 정보
import React, { useState } from 'react'
import { ReactComponent as PlayLogo } from '../static/images/play-button.svg'
import { ReactComponent as MuteIcon } from '../static/images/mute.svg'
import { ReactComponent as UnmuteIcon } from '../static/images/unmute.svg'
import ReactPlayer from 'react-player'


// 영화 정보를 가져와 사용. 제목, 줄거리
const Moviemain = ({ movie: { title, overview } }) => {
  // 음소거(isMuted)와 관련된 state 설정
  const [isMuted, setIsMuted] = useState(true)

  // React Player는 vimeo 방식 사용
  // Play 버튼 onClick 시 해당 유튜브 페이지로 이동
  // isMuted 여부에 따라 음소거 아이콘 컴포넌트 변경
  return (
    <div className='header'>
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
      <h1 className='header__container-heading'>{title}</h1>
      <button
        onClick={() => window.location.href = "https://youtu.be/mI9oyFMUlfg"}
        className='header__container-btnPlay'
      >
        <PlayLogo className='header__container-btnMyList-play' />
        Play
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
      <p className='header__container-overview'>{overview}</p>
      <div className='header__container--fadeBottom'></div>
    </div>
  )
}

export default Moviemain
