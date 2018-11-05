import * as React from 'react';
let PerfectScrollbar = require('react-perfect-scrollbar');
import 'react-perfect-scrollbar/dist/css/styles.css';
import './userused.scss';

export default class UserUsed extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    render() {
        return (
            <div className="user-used">
                <img src={require('./img/demo3.svg')} />
            </div>
        );
    }
}