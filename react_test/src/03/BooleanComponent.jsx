import React, {Component} from 'react'

class BooleanComponent extends Component {
    render() {
        const message = this.props.bored ? '놀러 가자' : '하던 일 열심히 마무리하기';
        return (
            <div className="message-container">
                {message}    
            </div>
        );
    }
}

export default BooleanComponent;