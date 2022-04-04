import React, {Component} from 'react'
import BooleanComponent from './BooleanComponent'

class BooleanComponentApp extends Component {
    render() {
        return (
            <div>
                <div><b>지루할 때 :</b><BooleanComponent bored /></div>
                <div><b>즐거울 떄 :</b><BooleanComponent /></div>
            </div>
        );
    }
}

export default BooleanComponentApp;