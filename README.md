## 집 가고 싶조

- Leader : 김철순
- Programmer : 김동민, 한정훈 
- Scenario Manager : 김진우
- DBA : 심재아

- [ ] 집 가고 싶조 프로젝트 ( Netflix clone )
    - 아래 항목들에 대한 기능 구현
        - TV shows
        - Movies
        - Recently Added
        - My List
        - Review Page
        - Play Button을 통한 임의 영상 재생

- 프로젝트 스케치 및 컴포넌트 구성

![Alt text](/image/홈_상단.png)
![Alt text](/image/홈_중단.png)
![Alt text](/image/홈_하단.png)
![Alt_text](/image/홈_상세정보.png)


### 결과물 시연
 - 메인화면   
 ![Alt_text](/image/메인1.png)   
 ![Alt_text](/image/메인2.png)

 - 메인화면 (구조)
    - app.js
```javascript

import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Footer from './component/Footer'
import Navbar from './component/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Search from './pages/Search'

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search' element={<Search />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>
)

export default App
```
 - 리액트 route 기능을 활용하여 페이지를 path형식으로 구분해서 사용자가 요청한 URL에 따라 해당 URL에 맞는 페이지를 보여주었습니다.
 - 리액트 라우터의 종류로 BrowserRouter, HashRouter이 있는데 BrowserRouter은 HTML5를 지원하는 브라우저의 주소를 감지하는데 저희 조는 이것을 사용했습니다.

 - <Navbar /> - Home.js

 ```javascript
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

        <Body selectMovieHandler={selectMovieHandler} />
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

 ```
