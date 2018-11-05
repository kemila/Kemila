import * as React from 'react';
import ModelItem from '../modelitem/modelitem';
let PerfectScrollbar = require('react-perfect-scrollbar');
import 'react-perfect-scrollbar/dist/css/styles.css';
import './modelmaterials.scss';

/**
 * @description：ModelMaterials对应的属性
 * @models:模型数据集合
 */
interface ICatalogModelProps {
    models: Array<any>
}

export default class ModelMaterials extends React.Component<ICatalogModelProps, any> {
    private _scrollRef: any;
    constructor(props: ICatalogModelProps) {
        super(props);
        this._scrollRef = null;
    }

    handleModels() {
        let models = [...this.props.models];
        models.forEach((item) => {
            if (item.imagesResize && item.imagesResize instanceof Array) {
                item.imageUrl = item.imagesResize[0] ? item.imagesResize[0] : '';
            } else {
                item.imageUrl = '';
            }
            // 色板的情况下,后台不返回图片
            if (item.hasOwnProperty('model') && item.model.color) {
                item.background = item.model.color;
                item.imageUrl = require('./img/transparent.svg');
            } else {
                item.background = '';
            }
        });

        return models;
    }

    getModelList() {
        let modelList;
        if (!this.props.models) {
            modelList = '';
        } else if (this.props.models.length === 0) {
            modelList = <div className="no-models-info">
                            <span>抱歉,查询数据为空!</span>
                        </div>
        } else {
            let models = this.handleModels();
            modelList = models.map(model => {
                return <ModelItem key={model.id} model={model}></ModelItem>
            });
        }

        return (
            modelList
        );
    }

    updateScrollbar(e) {
        this._scrollRef = e;
    }

    componentWillUpdate() {
        this._scrollRef.scrollTop  = 0;
    }

    render() {
        const modelList = this.getModelList();
        return (
            <div className="models-materials">
                <PerfectScrollbar containerRef={this.updateScrollbar.bind(this)}>
                    {modelList}
                </PerfectScrollbar>
            </div>
        );
    }
}