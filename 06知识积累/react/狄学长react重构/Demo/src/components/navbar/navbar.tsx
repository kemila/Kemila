import * as React from 'react';
import './navbar.scss';

export default class Navbar extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="navbar-container">
                <span className="title">GoldMantis Navbar</span>
            </div>
        );
    }
}