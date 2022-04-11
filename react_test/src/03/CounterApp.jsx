import React, { Component } from 'react';
import Counter from './Counter';
import NewCounter from './NewCounter';

class CounterApp extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 10 };
    this.resetCount = this.resetCount.bind(this);
  }
  resetCount() {
    this.setState(({ count }) => ({ count: count + 10}));
  }
  render() {
      return (  
        <div>        
          <div>
           <Counter count={this.state.count} />
          </div>
          <div><NewCounter count={this.state.count} /></div>
          <button onClick={this.resetCount}>{this.state.count +10}으로 초기화</button>
          </div>
      )
  }
}

export default CounterApp;