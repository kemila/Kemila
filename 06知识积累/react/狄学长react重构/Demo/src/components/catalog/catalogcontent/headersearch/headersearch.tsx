import * as React from 'react';
import ExpandConditions from '../../common/expandconditions/expandconditions';
let PerfectScrollbar = require('react-perfect-scrollbar');
import 'react-perfect-scrollbar/dist/css/styles.css';
import './HeaderSearch.scss';

interface IHeaderSearchProps {
    secondCategories: Array<any>,
    thirdCategories: Array<any>,
    secondActiveId: string,
    thirdActiveId: string,
    secondActiveName: string,
    thirdActiveName: string,
    tenantOperator: string,
    onChangeHeaderConditions?: () => void,
    onRecordHeaderSearchCategories?: (v1, v2, v3, v4, v5, v6) => void,
    onRecordCatalogSearchConditions?: (val1, val2) => void,
    onResetCatalogPageIndex: (val) => void,
}

export default class HeaderSearch extends React.Component<IHeaderSearchProps, any> {
    textInput: any;
    constructor(props: IHeaderSearchProps) {
        super(props);
        this.textInput = React.createRef();
    }

    componentDidMount() {
        this.textInput.current.focus();
    }

    componentWillUpdate() {
        this.textInput.current.focus();
    }

    getCatalogMark() {
        const catalogMark = <div className="condition-item">
                                <div className="name-control">
                                    <div className="name">4.0套餐</div>
                                    <span className="dot-bottom"></span>
                                    <span className="dot-top"></span>
                                </div>
                                <div className="items">
                                    <PerfectScrollbar>
                                        <div className="item">5.0套餐</div>
                                        <div className="item">4.0套餐</div>
                                        <div className="item">3.1套餐</div>
                                        <div className="item">3.0套餐</div>
                                    </PerfectScrollbar>
                                </div>
                            </div>;
        
        return (
            catalogMark
        )
    }

    getSecondMenuList() {
        const menuList = this.props.secondCategories.map(category => {
            let isMenuActive = this.props.secondActiveId === category.id;
            return <div className={['item', isMenuActive ? 'active' : ''].join(' ')} 
                        key={category.id} onClick={this.handleClickSecondMenu.bind(this, category)}>
                        {category.name}
                    </div>
        });
        let secondMenuList = <div className="condition-item">
                                <div className="name-control">
                                    <div className="name">{this.props.secondActiveName}</div>
                                    <span className="dot-bottom"></span>
                                    <span className="dot-top"></span>
                                </div>
                                <div className="items">
                                    <PerfectScrollbar>
                                        {menuList}
                                    </PerfectScrollbar>
                                </div>
                            </div>;

        return (
            secondMenuList
        )
    }

    getThirdMenuList() {
        const menuList = this.props.thirdCategories.map(category => {
            let isMenuActive = this.props.thirdActiveId === category.id;
            return <div className={['item', isMenuActive ? 'active' : ''].join(' ')}
                        key={category.id} onClick={this.handleClickThirdMenu.bind(this, category)}>
                        {category.name}
                    </div>
        });
        let thirdMenuList = <div className="condition-item">
            <div className="name-control">
                <div className="name">{this.props.thirdActiveName}</div>
                <span className="dot-bottom"></span>
                <span className="dot-top"></span>
            </div>
            <div className="items">
                <PerfectScrollbar>
                    {menuList}
                </PerfectScrollbar>
            </div>
        </div>;

        return (
            thirdMenuList
        )
    }

    handleClickSecondMenu(category) {
        let secondCategories = this.props.secondCategories, // 第二级分类
            thirdCategories = [...category.categories], // 第三级分类
            secondActiveId = category.id, // 第二级分类被激活的id
            thirdActiveId = category.id, //第三级分类被激活的id
            secondActiveName = category.name, // 第二级分类被激活的名称
            thirdActiveName = '全部'; // 第三级分类被激活的名称

        let item = {
            id: category.id,
            categories: [],
            name: '全部'
        }
        thirdCategories.splice(0, 0, item);
        //1.更改头部分类查询条件的信息
        this.props.onRecordHeaderSearchCategories(secondCategories, thirdCategories, secondActiveId,
            thirdActiveId, secondActiveName, thirdActiveName);
        //2.记录当前的active分类id
        this.props.onRecordCatalogSearchConditions(category.id, this.props.tenantOperator);
        //3.通过随机数的变化,重置分页数据
        let random = Math.random();
        this.props.onResetCatalogPageIndex(random);
        //4.由于更改分类id,父组件无法实时获取到active menuId
        //放到异步线程中
        setTimeout(() => {
            this.props.onChangeHeaderConditions();
        }, 0);
    }

    handleClickThirdMenu(category) {
        let secondCategories = this.props.secondCategories, // 第二级分类
            thirdCategories = this.props.thirdCategories, // 第三级分类
            secondActiveId = this.props.secondActiveId, // 第二级分类被激活的id
            thirdActiveId = category.id, //第三级分类被激活的id
            secondActiveName = this.props.secondActiveName, // 第二级分类被激活的名称
            thirdActiveName = category.name; // 第三级分类被激活的名称
        //1.更改头部分类查询条件的信息
        this.props.onRecordHeaderSearchCategories(secondCategories, thirdCategories, secondActiveId,
            thirdActiveId, secondActiveName, thirdActiveName);
        //2.记录当前的active分类id
        this.props.onRecordCatalogSearchConditions(category.id, this.props.tenantOperator);
        //3.通过随机数的变化,重置分页数据
        let random = Math.random();
        this.props.onResetCatalogPageIndex(random);
        //4.由于更改分类id,父组件无法实时获取到active menuId
        //放到异步线程中
        setTimeout(() => {
            this.props.onChangeHeaderConditions();
        }, 0);
    }

    render() {
        const catalogMark = this.getCatalogMark();
        const secondMenuList = this.getSecondMenuList();
        const thirdMenuList = this.getThirdMenuList();
        return (
            <div className="header-search">
                <div className="search-control">
                    <input className="search-input" placeholder="名称" ref={this.textInput} />
                    <img src={require('./img/search.svg')} alt="" />
                </div>
                <div className="select-conditions">
                    {catalogMark}
                    {secondMenuList}
                    {thirdMenuList}
                    <div className="expand-conditions-icon">
                        <img src={require('./img/expand.svg')} className="normal" alt=""/>
                        <img src={require('./img/expand-light.svg')} className="light" alt="" />
                    </div>
                </div>
                <ExpandConditions></ExpandConditions>
            </div>
        );
    }
}