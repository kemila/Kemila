import * as React from 'react';
let PerfectScrollbar = require('react-perfect-scrollbar');
import 'react-perfect-scrollbar/dist/css/styles.css';
import './useruploaded.scss';

export default class UserUploaded extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    render() {
        return (
            <div className="user-uploaded">
                <img src={require('./img/demo2.svg')} />
            </div>
        );
    }
}