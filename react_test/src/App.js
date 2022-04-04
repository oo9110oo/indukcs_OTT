import React, {Component} from 'react'
import './App.css';
import TodaysPlan from './03/TodaysPlan'
//import PropsComponentApp from './03/PropsComponentApp';
import ChildComponent from './03/ChildComponent';
import BooleanComponentApp from './03/BooleanComponentApp'

class App extends Component {
  render() {
    return (
      // <div className="App">
      //   <h1 className="title">화이팅 컴소!!!</h1>
      //   <div className="body">
      //     <TodaysPlan />  
      //   </div>
      // </div>
      <BooleanComponentApp />

    )
  }
}

export default App;
