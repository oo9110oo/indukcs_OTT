import React, { Component } from 'react';
import './App.css';
import PropsComponentApp from './03/PropsComponentApp';

class App extends Component {
    render() {
      return (
        // <div className="App">
        //   <h1 className="title">화이팅 컴소!!!</h1>
        //   <div className="body">
        //     <TodaysPlan />  
        //   </div>
        // </div>
        <PropsComponentApp />
      )
    }
  }
  
  export default App;