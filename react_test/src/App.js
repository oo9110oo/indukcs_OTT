import React, {Component} from 'react'
import './App.css';
import TodaysPlan from './03/TodaysPlan'
//import PropsComponentApp from './03/PropsComponentApp';
import ChildComponent from './03/ChildComponent';
import BooleanComponentApp from './03/BooleanComponentApp'
import LifecycleExampleApp from './03/LifecycleExampleApp';
import CounterApp from './03/CounterApp';
import TestApp from './03/TestApp';
import SFC from './03/SFC';
import ListExample from './03/ListExample';
import TodoList from './03/TodoList';
import Input from './03/input';

class App extends Component {
  render() {
    return (
      // <div className="App">
      //   <h1 className="title">화이팅 컴소!!!</h1>
      //   <div className="body">
      //     <TodaysPlan />  
      //   </div>
      // </div>
      <div><Input /></div>

    )
  }
}

export default App;
