import React from 'react'
import "../static/scss/footer.scss"
import DuckingLogo from '../static/images/ducking_full.png'

const footer = () => (
  <footer className='footer'>
    <div id="footer_box">
      <div id="footer_logo">
        <img src={DuckingLogo} style={{width:'200px', position: 'relative'}}/>       
      </div>
      
      

      <div id ="address">
        <ul>
          <li>서울시 노원구 초안산로 12</li>
          <li>TEL : 02-950-7000 Email : oo9110oo@naver.com</li>
          <li>COPYRIGHT (C) 집가고싶조 ALL RIGHTS RESERVED</li>
          <li>
          <div className='footer__copyright'>
      &copy; 2022 Made by{' '}
      <a
        className='footer__copyright--link'
        href='https://github.com/oo9110oo/indukcs_OTT.git'
      >
        {' '}
        DUCKING
      </a>
    </div>
          </li>
        </ul>
      </div>
      
    </div>
  </footer>
)



export default footer