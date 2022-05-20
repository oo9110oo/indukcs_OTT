import React from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
// import { createStore, applyMiddleware } from 'redux'
// import ReduxThunk from 'redux-thunk'
// import '@babel/polyfill'

// import reducers from './store/reducers'
// import AppRouter from './AppRouter'

import App from './App'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
// Import main sass file to apply global styles
import './static/scss/style.scss'

// const store = createStore(reducers, applyMiddleware(ReduxThunk))

// const app = (
//   <Provider store={store}>
//     <AppRouter />
//   </Provider>
// )

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

ReactDOM.render(app, document.getElementById('app'))
