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
 - store 구조
 ![Alt_text](/image/store구조.png)
``` actions index.js
export const fetchNetflixOriginals = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_NETFLIX_ORIGINALS, payload: dummy["NetflixOriginals"] })
    } catch (error) {
      console.log('error', error)
    }
  }
}

export const fetchTrending = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_TRENDING, payload: dummy["Trending"] })
    } catch (error) {}
  }
}

```
 - 저희 조는 DB를 사용하지 않고 더미데이터를 만들어서 사용하고 있어서 더미데이터를 호출하는 식으로 데이터를 가져오고 있습니다.
``` reducer 
import { FETCH_ACTION_MOVIES } from '../actions/index';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_ACTION_MOVIES:
      const data = action.payload.results;
      return { ...state, data };
    default:
      return state;
  }
}
```
 - reducre 에서 정의된 action값을 가지고와서 data를 return해주고 있습니다.
 
 - 마이리스트
 ![Alt text](/image/마이리스트_추가.png)
 ![Alt text](/image/마이리스트_중복.png)
 ![Alt text](/image/마이리스트.png)
 ![Alt text](/image/마이리스트_저장.png)

 마이리스트 구조
 - Modal.js
 ```javascript
  const addMovie = (movie) => {
    let movies = localStorage.getItem('list'); // movieList에 저장된 영화 개수
    var check = true; // 이미 저장된 영화인지 확인용 변수
    localStorage.setItem('checkMovie', JSON.stringify([children['props']['movie']])) // 저장된 영화인지 확인하기 위한 임시 저장
    if(movies != null){ // 저장된 영화인지 확인
      for (let i = 0; i <= movies; i++) {
        if(localStorage.getItem(i) != null) {
          if(JSON.parse(localStorage.getItem('checkMovie'))[0]['backdrop_path'] == JSON.parse(localStorage.getItem(i))[0]['backdrop_path']){
            check = false;
          }
        }
      }
    }    

    if(check == true) {
      movieNumber.current += 1;
      setMovieInput([movie, ...movieInput])
      localStorage.getItem('list') === null ? localStorage.setItem('list', 0) : localStorage.setItem('list', parseInt(localStorage.getItem('list'))+1)
      //localStorage.setItem(localStorage.getItem('list'), JSON.stringify([children['props']['movie']['title'],children['props']['movie']['release_date'],children['props']['movie']['overview']]))    
      localStorage.setItem(localStorage.getItem('list'), JSON.stringify([children['props']['movie']]))    
    
      var flag = true;      

      if (flag) {
        movieNumber.current += 1;
        setMovieInput([movie, ...movieInput])
      }

      alert("My List에 저장했습니다")  
    }
    else alert("이미 My List에 있는 영화입니다.")
  }
  .
  .
  .
  <button className='modal__btn modal__btn--red'>
    <PlayLogo className='header__container-btnMyList-play' />
    Play
  </button>
  <button  className='modal__btn'
    onClick={ () => {                   
      addMovie(children['props']['movie']) } }>
    <AddLogo className='header__container-btnMyList-add' />
    My List
  </button>
 ```
 - My List 버튼을 클릭시 onClick 으로 영화 데이터를 addMovie 에 넘기게 된다.
 - 마이리스트에 추가한 영화 데이터를 저장하기 위해 localStorage 를 사용했습니다.
 - 마이리스트에 저장할 때 첫번째 영화 저장일 경우 list라는 key를 가진 localStorage 를 생성합니다. 이미 list가 생성된 상태면 값을 +1 해줍니다
 - list는 영화를 저장한 횟수를 값으로 가지고 있습니다.
 - 이후 영화의 데이터를 list의 값을 key로 사용해 새로운 localStorage 에 저장합니다.
 - 마이리스트를 추가할 때 저장된 영화 데이터들과 비교해 중복 체크를 합니다.
 - MovieList.js
 ```javascript
 import React, { useState, useEffect } from 'react'
import "../static/scss/movieList.scss"

const MovieList = () => {  

  const listDelete = (e) => {
    if(window.confirm("정말 삭제하시겠습니까?")) {
      localStorage.removeItem(e)      
      window.location.reload(); // 새로고침. 새로고침 안하면 화면이 그대로 남아있어서
    }
  }

  const rendering = () => {
    let movies = localStorage.getItem('list'); // myList에 저장된 영상 개수
    const result = [];
    let resultCnt = 0;
    if (movies == null) {
      result.push(<div>
        <h3 style={{color: 'white'}}>myList가 비어있습니다.</h3>
      </div>)
      return result;
    } else {
      for (let i = 0; i <= movies; i++) { // 저장된 영상들의 key는 다 숫자임
        if(localStorage.getItem(i) != null) { // 영상 데이터 있는지 확인
          const title = JSON.parse(localStorage.getItem(i))[0]['title'] || JSON.parse(localStorage.getItem(i))[0]['name'];
          // 영상들 중에서 제목이 title에 저장되는거랑 name에 저장되는게 있어서 둘 중 하나만 있어도 가져오도록 설정
          const imagePath = 'https://image.tmdb.org/t/p/original/' + JSON.parse(localStorage.getItem(i))[0]['backdrop_path'];
          result.push(<div className='addMovieList' key={title}>          
            <img className='movieShowcase__container--movie-image' src={imagePath} style={{width:'200px'}} />
            <button className='deleteIcon' value={i} onClick={(e) => listDelete(e.target.value)}></button>
            <h5 className='movieName'>{title}</h5>
            </div>
          );
          resultCnt++;
        }
      }
      if(resultCnt == 0) {
        result.push(<div>
          <h3 style={{color: 'white'}}>myList가 비어있습니다.</h3>
        </div>)
      }

      return result;
    }
    
  };



    return (
      <div className='detail-menu-modal'>
        
        <h3 className='modal__title'>My List</h3>    
        <div>          
          <div className='imageList'>{rendering()}</div>
        </div>          
        
      </div>
    )
}

export default MovieList
 ```
 - 마이리스트는 모달 형식으로 제작했습니다.
 - list를 key로 가지고 있는 localStorage 를 불러와서 list 만큼 반복문을 사용해 저장되어 있는 모든 영화를 출력합니다.
 - 출력 전에 값이 정말 있는지 확인합니다.
 - 영화의 사진 오른쪽 상단에 X 버튼을 클릭시 삭제가 가능합니다.
 - X 버튼의 value에 영화의 key를 저장한 후 버튼 클릭시 value값을 listDelete 에 보내서 삭제를 수행합니다.
 - 삭제가 완료되면 창을 새로고침하게 됩니다.