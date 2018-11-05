import * as React from 'react';
let PerfectScrollbar = require('react-perfect-scrollbar');
import 'react-perfect-scrollbar/dist/css/styles.css';
import './usercollection.scss';

export default class UserCollection extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    render() {
        return (
            <div className="user-collection">
                <img src={require('./img/demo1.svg')} />
            </div>
        );
    }
}