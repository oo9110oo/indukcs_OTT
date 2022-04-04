import React, { Component} from 'react';
import ChildComponent from "./ChildComponent"

class ChildComponentApp extends Component {
    render() {
        return (
            <ChildComponent
                boolValue = {true}
                numValue = {1}
                arrayValue = {[1,2,3]}
                objValue = {{ name : '제목', age:30}}
                nodeValue={<h1>노드</h1>}
                funcValue={() => { console.log('메시지'); } }
            />
        );
    }
}

export default ChildComponentApp