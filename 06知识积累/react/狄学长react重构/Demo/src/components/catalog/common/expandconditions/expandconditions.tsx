import * as React from 'react';
let PerfectScrollbar = require('react-perfect-scrollbar');
import 'react-perfect-scrollbar/dist/css/styles.css';
import './expandconditions.scss';

interface IExpandConditionsStates {
    styles: Array<any>,
    colors: Array<any>,
    brands: Array<any>
}

export default class ExpandConditions extends React.Component<any, IExpandConditionsStates> {
    constructor(props) {
        super(props);
        this.state = {
            styles: ['不限', '现代', '美式', '地中海', '欧式', '日式', '田园'],
            colors: ['不限', '白色', '黄色', '红色', '绿色', '紫色', '褐色'],
            brands: ['飞利浦', '博德', '施耐特', '德邦', '索菲亚']
        };
    }

    getStyleList() {
        let styleList;
        if (this.state.styles.length > 0) {
            let list = this.state.styles.map((style) => {
                return <span className="item" key={style}> {style} </span>
            });
            styleList = <div className="condition-item">
                            <div className="title">风格</div>
                            <div className="split-line"></div>
                            <div className="items">
                                {list}
                            </div>
                        </div>
        } else {
            styleList = '';
        }

        return (
            styleList
        )
    }

    getColorList() {
        let colorList;
        if (this.state.colors.length > 0) {
            let list = this.state.colors.map((color) => {
                return <span className="item" key={color}> {color} </span>
            });
            colorList = <div className="condition-item">
                            <div className="title">颜色</div>
                            <div className="split-line"></div>
                            <div className="items">
                                {list}
                            </div>
                        </div>
        } else {
            colorList = '';
        }

        return (
            colorList
        )
    }

    getBrandList() {
        let brandList;
        if (this.state.brands.length > 0) {
            let list = this.state.brands.map((brand) => {
                return <span className="brand-item" key={brand}> {brand} </span>
            });
            brandList = <div className="condition-item">
                            <div className="title">品牌</div>
                            <div className="split-line"></div>
                            <div className="items">
                                {list}
                            </div>
                        </div>
        } else {
            brandList = '';
        }

        return (
            brandList
        )
    }

    render() {
        const styleList = this.getStyleList();
        const colorList = this.getColorList();
        const brandList = this.getBrandList();
        return (
            <div className="expand-conditions">
                <PerfectScrollbar>
                    {styleList}
                    {colorList}
                    {brandList}
                </PerfectScrollbar>
            </div>
        );
    }
}