import React, {Component} from 'react';
import MyComponent from './MyComponent';

class MyComponentApp extends Component {
    render() {
        return (
            <div className="body">
                <MyComponent name="message" />    
            </div>
        );
    }
}

export default MyComponentApp;