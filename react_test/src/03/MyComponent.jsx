import React, {Component} from 'react';

class MyComponent extends Component {
    render() {
        const name = this.props.name;
        return (
            <div>
        <span>{name} #1</span><br></br>
        <span>{name} #2</span><br></br>
        <span>{name} #3</span><br />
        <span>{name} #4</span><br/>
        <span>{name} #5</span><br/>
        <span>{name} #6</span>
        </div>
        );
    }
}

export default MyComponent