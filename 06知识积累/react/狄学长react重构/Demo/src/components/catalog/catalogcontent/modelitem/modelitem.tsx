import * as React from 'react';
import store from '../../../../store/index';
import * as Actions from '../../../../actions/catalog';
import './modelitem.scss';
/**
 * @description:每个模型组件对应的属性
 * @model:单个模型数据
 */
interface IModelItemProps {
    model: any 
}
/**
 * @description:每个模型组件对应的states
 * @loading:图片加载完成前的loading
 */
interface IModelItemStates {
    loading: boolean
}

export default class ModelItem extends React.Component<IModelItemProps, IModelItemStates> {
    constructor(props: IModelItemProps) {
        super(props);
        this.state = {
            loading: true
        };
    }

    handleImageErrored(e) {
        e.target.src = require('./img/error_img.svg');
    }

    handleImageLoaded() {
        this.setState({
            loading: false
        });
    }

    render() {
        return (
            <div className="model">
                <div className="model-img" style={{ background: this.props.model.background }}>
                    <img src={this.props.model.imageUrl}
                        onLoad={this.handleImageLoaded.bind(this)}
                        onError={this.handleImageErrored.bind(this)} />
                    <div className="loading"
                        style={this.state.loading ? { display: 'block' } : { display: 'none' }}>
                        <img src={require('./img/loading.svg')} className="img-rotation"/>    
                    </div>
                    <div className="favorite-controls">
                        <img className="add" src={require('./img/favorite_normal.svg')} title="收藏" />
                        <img className="added" src={require('./img/favorite_light.svg')} title="取消收藏" />
                    </div>
                </div>
                <div className="description">
                    <span className="name">{this.props.model.name}</span>
                </div>
            </div>
        );
    }
}