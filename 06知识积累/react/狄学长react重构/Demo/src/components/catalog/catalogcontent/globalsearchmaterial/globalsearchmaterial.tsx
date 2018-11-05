import * as React from 'react';
import './globalsearchmaterial.scss';

interface IGlobalSearchMaterialProps {

}

interface IGlobalSearchMaterialStates {

}

export default class Hydropower extends React.Component<IGlobalSearchMaterialProps, IGlobalSearchMaterialStates> {
    textInput: any;
    constructor(props: IGlobalSearchMaterialProps) {
        super(props);
        this.textInput = React.createRef();
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.textInput.current.focus();
    }

    render() {
        return (
            <div className="global-search-material">
                <div className="search-control">
                    <input className="search-input" placeholder="全局搜索" ref={this.textInput} />
                    <img src={require('./img/search.svg')} alt=""/>
                </div>
                <div className="recently-search">
                    <div className="title">最近搜索</div>
                    <div className="items">
                        <div className="item">
                            窗
                        </div>
                        <div className="item">
                            席梦思
                        </div>
                        <div className="item">
                            沙发
                        </div>
                        <div className="item">
                            组合地板
                        </div>
                        <div className="item">
                            金螳螂专用地板
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}