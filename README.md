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
 - 리액트 라우터의 종류 BrowserRouter, HashRouter 중 BrowserRouter은 HTML5를 지원하는 브라우저의 주소를 감지하는데 저희 조는 이것을 사용했습니다.

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
 - Body의 selectMovieHandler 를 클릭하면 해당 movie를 비동기형식으로 전달받아서 Modal 창을 띄우도록 설계했습니다.

 - Header.js

 ``` javascript
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
        <div className='navigation__container-link pseudo-link' onClick={() => goHome()}>Home</div>
        <div className='navigation__container-link pseudo-link' onClick={() => onCategoryClick('Netflix Originals')}>Netflix</div>
 
 ```
 - useScroll은 리액트의 Hook 중 하나입니다. 이 Hook은 사용자가 스크롤을 사용할 때 지정한 조건에 맞추어 기능합니다.
 - useScroll을 이용해 사용자가 스크롤을 내렸을 경우 Y값을 받아와 Header의 배경이 검게 처리되도록 합니다.
 - 로고와 각 카테고리 텍스트에 onCategoryClick 이벤트를 할당하여 각 텍스트가 클릭될 경우 지정된 위치로 이동하는 앵커 액션이 실행됩니다.
 

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
 - useSelector는 리액트의 리덕스 스토어 관련 Hook중 하나입니다. 이 Hook은 스토어의 상태값을 반환해주는 역할을 합니다.
 - useSelector를 사용한 함수에서 리덕스 스토어의 상태값이 바뀐 경우 바뀐 스토어의 상태값을 다시 가져와 컴포넌트를 렌더링 시킵니다.
 - redux의 액션 생성함수를 실행하여 리덕스 스토어에 변경된 상태값을 저장하기 위해서는 useDispatch라는 리액트 훅을 사용하여 액션을 실행시켜야 합니다.
 - store 구조
 ![Alt_text](/image/store구조.png)
 - action index.js
``` javascript
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
 - reducer
``` javascript 
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
 - reducer 에서 정의된 action값을 가지고와서 data를 return해주고 있습니다.



- 영화 상세보기 (모달창)   

 ![Alt_text](/image/modal.png)

 - MoiveGroup.js
``` javascript
{movies &&
          movies.map((movie, idx) => {
            let movieImageUrl = isNetflixMovies
              ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
              : `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`

            if (movie.poster_path && movie.backdrop_path !== null) {
              return (
                <SwiperSlide
                  onClick={() => selectMovieHandler(movie)}                  
                  key={idx}
                  className={
                    'movieShowcase__container--movie' +
                    (isNetflixMovies ? '__netflix' : '')
                  }
                >
                  <img
                    src={movieImageUrl}
                    className='movieShowcase__container--movie-image'
                  />
                </SwiperSlide>
              )
            }
          })}
```
 - 메인화면에서 Moive를 클릭하면 selectMovieHandler() 함수로 영화 정보를 보내 Modal창을 호출하게 됩니다.

 - Modal.js

 ``` javascript
const Modal = ({ show, modalClosed, children, backgroundImage }) => {
  const backgroundStyle = {
    backgroundSize: 'cover',
    backgroundImage: `url(https://image.tmdb.org/t/p/original/${backgroundImage})`,
  }
  return (
      <div>
          <div>
          <Backdrop show={show} toggleBackdrop={modalClosed} />
          <div
            style={backgroundStyle}
            className={show ? 'modal show' : 'modal hide'}
          >
            <div className='modal__container'>
              <h1 className='modal__title'>{children['props']['movie']['title'] || children['props']['movie']['name']}</h1>
              <p className='modal__info'>
                <span className='modal__rating'>Rating: {children['props']['movie']['vote_average'] * 10}% </span>
                Release date: {children['props']['movie']['release_date']} 
              </p>
              {/* <p className='modal__episode'>
                {number_of_episodes ? ' Episodes: ' + number_of_episodes : ''}
                {number_of_seasons ? ' Seasons: ' + number_of_seasons : ''}
              </p> */}              
              <p className='modal__overview'>{children['props']['movie']['overview']}</p>              
                       
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
            </div>
          </div>
        </div>
      </div>
  )
 ```
 - Moive의 정보를 받아 출력하는 코드 입니다.



 - 마이리스트
 ![Alt text](/image/마이리스트_추가.PNG)
 ![Alt text](/image/마이리스트_중복.PNG)
 ![Alt text](/image/마이리스트.PNG)
 ![Alt text](/image/마이리스트_저장.PNG)

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
 - localStore란 브라우저가 가지고 있는 임시 저장공간(localStorage)을 말합니다.
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



 - 검색
 ![Alt_text](/image/검색.PNG)
 ![Alt_text](/image/검색_없음.PNG)
 - Header.js
 ```javascript
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
  .
  .
  .
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
 ```
 - 화면 오른쪽 상단에 있는 검색 아이콘 클릭시 검색창이 나타납니다.
 - onChange 로 input 안의 값이 변경될 때 마다 주소창이 /search?q=값 으로 변경됩니다.
 - App.js에 설정한 대로 URL이 /search로 변해서 검색창으로 이동합니다.
 - Search.js
 ```javascript
 import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import MovieModal from '../component/MovieModal'
import Modal from '../component/Modal'
import { useDebounce } from '../hook/useDebounce'
import * as movieActions from '../store/actions'

// A custom hook that builds on useLocation to parse
// the query string for you.
const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const Search = () => {
  let query = useQuery()
  const debouncedSearchTerm = useDebounce(query.get('q'), 500)
  const [isToggleModal, setIsToggleModal] = useState(false)
  const { searchResults, isLoading } = useSelector((state) => state.searchMovie)
  const { movieDetails } = useSelector((state) => state.movieDetails)
  const dispatch = useDispatch()

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(movieActions.fetchSearchMovie(debouncedSearchTerm))
    }
  }, [debouncedSearchTerm])

  const onCloseModalHandler = () => {
    setIsToggleModal(false)
  }

  const onSelectMovieHandler = (movie) => {
    dispatch(movieActions.fetchMovieDetails(movie.media_type, movie.id))
    setIsToggleModal(true)
  }

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <>
        <div className='search-container'>
          {searchResults.map((movie) => {
            if (movie.backdrop_path !== null && movie.media_type !== 'person') {
              const movieImageUrl =
                'https://image.tmdb.org/t/p/w500' + movie.backdrop_path
              return (
                <div className='movie'>
                  <div
                    onClick={() => onSelectMovieHandler(movie)}
                    className='movie__column-poster'
                  >
                    <img src={movieImageUrl} alt='' className='movie__poster' />
                  </div>
                </div>
              )
            }
          })}
        </div>
        <Modal
          show={isToggleModal}
          modalClosed={onCloseModalHandler}
          backgroundImage={
            movieDetails.backdrop_path || movieDetails.poster_path
          }
        >
          <MovieModal movie={movieDetails} />
        </Modal>
      </>
    ) : (
      <div className='no-results'>
        <div className='no-results__text'>
          <p>
            Your search for "{debouncedSearchTerm}" did not have any matches.
          </p>
          <p>Suggestions:</p>
          <ul>
            <li>Try different keywords</li>
            <li>Looking for a movie or TV show?</li>
            <li>Try using a movie, TV show title, an actor or director</li>
            <li>Try a genre, like comedy, romance, sports, or drama</li>                        
          </ul>
        </div>        
      </div>
    )
  }

  return !isLoading ? renderSearchResults() : <h1>Loading...</h1>
}

export default Search
 ```
 - debouncedSearchTerm 에 검색한 값을 저장하지만 useDebounce 를 사용해 바로바로 저장하는게 아니라, 입력이 끝나고 좀 있다 저장하게 됩니다.
 - 검색값이 있으면 검색창이 계속 유지되고 검색값이 다 지워지면 다시 메인화면으로 돌아갑니다.
 - 검색해서 나온 영상 이미지들을 클릭시 상세화면이 나옵니다.
 - 만약 검색한 결과가 없을시에 별도의 메시지가 나옵니다.


 - 마지막으로는 기존 코드에서 문제점을 조금씩 보완하였습니다.
 - MovieList.js
 ```javascript
  // Navigation 사용
  const navigate = useNavigate()

  // MyList 항목 삭제 함수
  const listDelete = (e) => {
    const movies = localStorage.getItem('list')

    if (window.confirm("정말 삭제하시겠습니까?")) {
      for (let i = e; i < movies; i++) {
        localStorage.setItem(i, localStorage.getItem(i + 1))
      }
      localStorage.removeItem(movies)
      localStorage.setItem('list', parseInt(localStorage.getItem('list')) - 1)

      const serachText = window.location.href.split('search')[1]
      if (serachText == undefined) navigate('/')
      else navigate('search' + serachText);
    }
  }

  // 렌더링 함수
  const rendering = () => {
    let movies = localStorage.getItem('list') // myList에 저장된 영상 개수
    const result = []
    // myList 비어있는지 검사, 아니면 myList 불러옴
    if (movies == null || parseInt(movies) <= 0) {
      localStorage.setItem('list', 0)
      result.push(
        <div key='none'>
          <h3>
            My List가 비어있습니다.<br /><br />
            관심 있는 컨텐츠를 My List에 추가해 주세요!
          </h3>
        </div>)
      return result
 ```
 - 기존 방식은 window.location.href를 이용하여 웹 페이지를 새로고침 합니다.
 - 이 때문에 My List가 웹 페이지를 리프레시하며 강제로 꺼졌습니다.
 - 또한 검색 내용이 있으면 웹 주소가 달라져 웹 페이지가 제대로 작동을 안 하는 이슈가 있었습니다.
 - 따라서 useNavigate hook을 활용하여 웹 페이지를 리프레시 함으로써 검색 내용을 동시에 보유할 수 있는 형태로 만들었습니다.
![Alt_text](/image/마이리스트_기능개선.png)
![Alt_text](/image/마이리스트_기능개선2.png)


 - 그리고 My List에 항목이 없을 때 문구가 제대로 표시되지 않는 이슈가 있었습니다.
 - 그래서 My List를 관리하는 로직을 약간 수정하였습니다.
 - 영화를 삭제하면 localStorage의 키값을 줄여 index를 하나씩 당겨오는 형태로 만들었습니다.
 - 또한 영화의 개수가 0개 이하이면 My List가 비어있다고 판단하도록 하였습니다. 
![Alt_text](/image/마이리스트_삭제전.png)
![Alt_text](/image/마이리스트_삭제후.png)
![Alt_text](/image/마이리스트_비어있음.png)
