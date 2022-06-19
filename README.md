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

 - Home.js

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

 - 리액트 기능 중 HOOK를 사용하여 컴포넌트 내에서 useState 기능을 사용할 수 있도록 했습니다.
 - useState는 현재의 state 값과 이 값을 업데이트하는 함수를 쌍으로 제공, 이 함수를 핸들러나 다른 곳에서 호출할 수 있습니다.
 - useState는 클래스에서 사용하는 this.setState와 유사하지만 이전 state와 새로운 state를 합치지 않는다는 차이점이 존재 합니다.
 - BOdy의 selectMovieHandler 를 클릭하면 해당 movie를 비동기형식으로 전달받아서 Modal 창을 띄우도록 설계했습니다.

 - Body.js

 ``` javascript
 const MainContent = ({ selectMovieHandler }) => {
  const { movieDetails } = useSelector((state) => state.movieDetails)
  const netflixOriginals = useSelector((state) => state.netflixOriginals)
  const trending = useSelector((state) => state.trending)
  const topRated = useSelector((state) => state.topRated)
  const actionMovies = useSelector((state) => state.action)
  const comedyMovies = useSelector((state) => state.comedy)
  const horrorMovies = useSelector((state) => state.horror)
  const romanceMovies = useSelector((state) => state.romance)
  const documentaries = useSelector((state) => state.documentary)

  const dispatch = useDispatch() // dispatch로 재선언하여 사용한다.

  useEffect(() => {
    dispatch(movieActions.fetchMovieDetails('movie', '284052')) 
    dispatch(movieActions.fetchNetflixOriginals())
    dispatch(movieActions.fetchTrending())
    dispatch(movieActions.fetchTopRated())
    dispatch(movieActions.fetchActionMovies())
    dispatch(movieActions.fetchComedyMovies())
    dispatch(movieActions.fetchHorrorMovies())
    dispatch(movieActions.fetchRomanceMovies())
    dispatch(movieActions.fetchDocumentaries())
  }, [dispatch])

  return (
    <div className='container'>
      <MovieMain movie={movieDetails} />
      <div className='movieShowcase'>
        <MovieGroup
          isNetflixMovies={true}
          title='Netflix Originals'
          selectMovieHandler={selectMovieHandler}
          movies={netflixOriginals.data}
        />
```
 - useSelector는 리액트의 리덕스 스토어 관련 Hook중 하나이다. 이 Hook은 스토어의 상태값을 반환해주는 역할을 한다.
 - useSelector를 사용한 함수에서 리덕스 스토어의 상태값이 바뀐 경우 바뀐 스토어의 상태값을 다시 가져와 컴포넌트를 렌더링 시킨다.
 - redux의 액션 생성함수를 실행하여 리덕스 스토어에 변경된 상태값을 저장하기 위해서는 useDispatch라는 리액트 훅을 사용하여 액션을 실행시켜야 한다.