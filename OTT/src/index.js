import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
//import { createRoot } from 'react-dom/client';

import { createStore, applyMiddleware } from 'redux'
import reducers from './store/reducers'
import ReduxThunk from 'redux-thunk'

import App from './App'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './static/scss/style.scss'

// Redux 스토어 생성. 미들웨어 사용
const store = createStore(reducers, applyMiddleware(ReduxThunk))

// 앱 생성, Provider 아래 배치한 컴포넌트들은 스토어에 연결됨
const app = (
    <Provider store={store}>
      <App />
    </Provider>
  )

// 앱 렌더링
ReactDOM.render(app, document.getElementById('app'))