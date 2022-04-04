import React, {Component} from 'react';
import propTypes from 'prop-types';

class PropsComponent extends Component {
    render() {
        return (
            <div className="message-container">
                {this.props.name}    
            </div>
        );
    }
}

PropsComponent.propTypes = {
    name : propTypes.string,
}

export default PropsComponent;