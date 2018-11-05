import * as React from 'react';
import Navbar from '../navbar/navbar';
import Catalog from '../catalog/catalog';
import './app.scss';

export default class App extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="app-container">
                <Navbar />
                <Catalog />
            </div>
        );
    }
}