import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client';

import { createStore, applyMiddleware } from 'redux'
import reducers from './store/reducers'
import ReduxThunk from 'redux-thunk'

import App from './App'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './static/scss/style.scss'

// const app = (
//   <Provider >
//     <App />
//   </Provider>
// )

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('app')
// );

// ReactDOM.render(app, document.getElementById('app'))

const store = createStore(reducers, applyMiddleware(ReduxThunk))

const app = (
    <Provider store={store}>
      <App />
    </Provider>
  )
  
ReactDOM.render(app, document.getElementById('app'))

//const container = document.getElementById('app');
//const root = createRoot(container); // createRoot(container!) if you use TypeScript
//root.render(<App />);
// root.render(app);