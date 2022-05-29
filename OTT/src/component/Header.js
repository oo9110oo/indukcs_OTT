import React, { useState, useEffect, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { useScroll } from '../hook/useScroll'
import { ReactComponent as SearchLogo } from '../static/images/search-icon.svg'
import DuckingLogo from '../static/images/Netflix_Logo_RGB.png'
import { ReactComponent as BellLogo } from '../static/images/bell-logo.svg'
// import DropdownArrow from '../static/images/drop-down-arrow.svg'
import { ReactComponent as DropdownArrow } from '../static/images/drop-down-arrow.svg'

const Header = () => {
  const searchInput = React.useRef(null)
  const [userInput, setUserInput] = useState('')
  const [scrollDimensions] = useScroll()
  const { scrollY } = scrollDimensions

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
        <div className='navigation__container-link pseudo-link'>Home</div>
        <div className='navigation__container-link pseudo-link'>Movies</div>
        <div className='navigation__container-link pseudo-link'>TV</div>
        <div className='navigation__container-link pseudo-link'>
          Recently Added
        </div>
        <div className='navigation__container-link pseudo-link'>My List</div>

        <div className='navigation__container--left'>
          <SearchLogo className='logo' />
          <input
            ref={searchInput}
            value={userInput}
            onChange={(event) => onChange(event)}
            className='navigation__container--left__input'
            type='text'
            placeholder='Title, genres, people'
          />
        </div>

        <div className='navigation__container-link pseudo-link'>KIDS</div>
        <div className='navigation__container-link pseudo-link'>DVD</div>
        <BellLogo className='navigation__container--bellLogo' />

        {/* <DropdownContent /> */}
        <DropdownArrow className='navigation__container--downArrow' />
      </ul>
    </nav>
  )
}

export default Header