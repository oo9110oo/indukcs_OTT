import React from 'react';
import ChildComponent2 from './ChildComponent2';

class ChildComponent2App extends Component {
    render() {
        return (
            <div>
                <ChildComponent2 
                    objValue= {{age: '20살'}}
                />
            </div>
        );
    }
}

export default ChildComponent2App;