import React, {Component} from 'react';

class StateExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading : true,
            formData : 'no data',
        };

        this.handleData = this.handleData.bind(this);
        setTimeout(this.handleData, 4000);
    }

    handleData() {
        const data = 'new data';
        const { formData } = this.state;

        this.setState({
            loading: false,
            formData : data + formData,
        });
        console.log('loading값', this.state.loading);
    }
    render() {
        return (
            <div>
                <span>로딩 중 : {String(this.state.loading)}</span>
                <span>결과 : {this.state.formData}</span>
            </div>
        )
    }
}

export default StateExample;