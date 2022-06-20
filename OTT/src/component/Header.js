import React, { useState, useEffect, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { useScroll } from '../hook/useScroll'
import { ReactComponent as SearchLogo } from '../static/images/search-icon.svg'
import DuckingLogo from '../static/images/ducking_full.png'
import { ReactComponent as BellLogo } from '../static/images/bell-logo.svg'
// import DropdownArrow from '../static/images/drop-down-arrow.svg'
import { ReactComponent as DropdownArrow } from '../static/images/drop-down-arrow.svg'
import MovieList from './MovieList'
import BodyBlackoutStyle from './BodyBlackOutStyle'

//import { useViewport } from '../hook/useViewport'

const Header = () => {
  const searchInput = useRef(null)
  const [userInput, setUserInput] = useState('')
  const [scrollDimensions] = useScroll()
  const { scrollY } = scrollDimensions

  const [isVisible, setModalVisible] = useState(false);
  const onModalVisible = (active) => {
    setModalVisible(active);
  }

  const onChange = async (event) => {
    setUserInput(event.target.value)
  }

  const navigate = useNavigate();

  useEffect(() => {    
    if (
      document.activeElement === searchInput.current &&
      userInput.length === 0
    ) {
      navigate('/')
    }
    if (userInput.length > 0) navigate(`/search?q=${userInput}`)
  }, [userInput, searchInput])

  const onLogoClick = () => {
    setUserInput('')
  }

  const goHome = () => {
    window.location.href = '/'
  }

  const onCategoryClick = (name) => {
    window.location.href= "/#" + name
  }

//  console.log(DropdownArrow)
  return (
    <nav className={'navigation ' + (scrollY > 50 ? 'black' : '')}>
      <ul className='navigation__container'>
        <NavLink to='/' onClick={() => onLogoClick()}>
          <img
            className='navigation__container--logo'
            src={DuckingLogo}
            alt=''
          />
        </NavLink>
        <DropdownArrow className='navigation__container--downArrow-2'></DropdownArrow>
        {/* <img src="{DropdownArrow}" alt="DropdownArrow" /> */}
        <div className='navigation__container-link pseudo-link' onClick={() => goHome()}>Home</div>
        <div className='navigation__container-link pseudo-link' onClick={() => onCategoryClick('Netflix Originals')}>Netflix</div>
        <div className='navigation__container-link pseudo-link' onClick={() => onCategoryClick('Trending')}>Trending</div>
        <div className='navigation__container-link pseudo-link' onClick={() => onCategoryClick('Top Rated')}>Top Rated</div>
        <div className='navigation__container-link pseudo-link' onClick={() => onCategoryClick('Action Movies')}>Action Movies</div>
        <div className='navigation__container-link pseudo-link' onClick={() => onCategoryClick('Comedy')}>Comedy</div>
        <div className='navigation__container-link pseudo-link' onClick={() => onCategoryClick('Horror Movies')}>Horror Movies</div>
        <div className='navigation__container-link pseudo-link' onClick={() => onCategoryClick('Romance')}>Romance</div>
        <div className='navigation__container-link pseudo-link' onClick={() => onCategoryClick('Documentaries')}>Documentaries</div>
        <div className='navigation__container-link pseudo-link' onClick={() => onModalVisible(true)}>My List</div>
        <div>
          {isVisible && <BodyBlackoutStyle onModalVisible={onModalVisible} />}
          {isVisible && <MovieList />}
        </div>
        <div className='navigation__container--left'>
          <SearchLogo className='logo' />
          <input
            ref={searchInput}
            value={userInput}
            onChange={(event) => onChange(event)}
            className='navigation__container--left__input'
            type='text'
            placeholder='Title, Genres, People...'
          />
        </div>

        {/* <div className='navigation__container-link pseudo-link'>KIDS</div>
        <div className='navigation__container-link pseudo-link'>DVD</div> }
        {/* <BellLogo className='navigation__container--bellLogo' /> */}

        {/* <DropdownContent /> */}
        {/* <DropdownArrow className='navigation__container--downArrow' /> */}
      </ul>
    </nav>
  )
}

export default Header