import React, { Component } from 'react';
// import MyComponent from './MyComponent2';
// import MyPureComponent from './MyPureComponent';

class MyComponent extends Component {
    componentDidUpdate() { console.log('MyComponent 새로 고침'); }
    render() { return null;}
}
class MyPureComponent extends Component {
    componentDidUpdate() { console.log('MyPureComponent 새로 고침'); }
    render() { return null; }
}
class TestApp extends Component {
    constructor(props) {
        super(props);
        this.listValue= [{name: 'Park'}, {name: 'Lee'}];
        this.state = { version: 0};
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        setTimeout(() => {
            this.listValue[0].name = '컴소';
            this.setState({version: 1});
        }, 200);
        setTimeout(() => {
            this.listValue = [{name: '컴소'}, {name: 'Lee'}];
            this.setState({version: 2});
        }, 500);
    }
    render() {
        return (
            <div className="body">
                <MyComponent value={this.listValue} />
                <MyPureComponent value={this.listValue} />
                <button onClick = {this.handleClick}>버튼</button>    
            </div>
        );
    }
}

export default TestApp;