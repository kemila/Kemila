import * as React from 'react';
import CatalogSubmenu from '../../../../containers/catalog/common/catalogsubmenu';
let PerfectScrollbar = require('react-perfect-scrollbar');
import 'react-perfect-scrollbar/dist/css/styles.css';
import './catalogcategory.scss';

/**
 * @description: catalog模型的分类属性
 * @showCategories: 是否显示下拉分类
 * @categories: 分类数据
 */
export interface ICatalogCategoryProps {
    showCategories: boolean,
    categories: Array<any>,
    onChangeCategoryId: (val1, val2?) => void,
    onRecordHeaderSearchCategories?: (v1, v2, v3, v4, v5, v6) => void
    onRef?: (val) => void
}
/**
 * @description: 后台接口获取的category分类,涉及的状态
 * @activeMenuId: 按钮被点击后,记录category id
 * @activeIndex: 按钮被点击激活状态
 * @menuIndex: 鼠标放在按钮上的激活状态
 * @categories: 二级菜单对应的数据
 * @submenuOffsetTop: 二级菜单对应的top值
 */
export interface ICatalogCategoryStates {
    activeIndex: number,
    menuIndex: number,
    categories: Array<any>,
    submenuOffsetTop: string
}

export default class CatalogCategory extends React.Component<ICatalogCategoryProps, ICatalogCategoryStates> {
    constructor(props: ICatalogCategoryProps) {
        super(props);
        this.state = {
            activeIndex: -1,
            menuIndex: -1,
            categories: [],
            submenuOffsetTop: '0px'
        };
    }

    resetActiveMenu(activeIndex: number) {
        this.setState({
            activeIndex: activeIndex,
        });
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    getMenuList() {
        const menuList = this.props.categories.map((category, index) => {
            let isActive = this.state.activeIndex === index;
            return <div className="item" key={category.id}
                onMouseEnter={this.handleFirstMenuEnter.bind(this, category, index)}>
                <div className={['first-menu-name',
                                'menu-name',
                                isActive ? 'active' : ''].join(' ')}
                    onClick={this.handleFirstMenuClicked.bind(this, category, index)}>
                    {category.name}
                </div>
                <div className="triangle-border-left"
                    style={(this.state.menuIndex === index)
                        ? { display: 'block' }
                        : { display: 'none' }}>
                    <span></span>
                </div>
            </div>
        });

        return (
            menuList
        );
    }

    handleFirstMenuClicked(category, activeIndex) {
        this.setState({
            activeIndex: activeIndex,
            menuIndex: -1,
        });
        this.recordFirstMenuCategories(category.id, category);
        this.props.onChangeCategoryId(category.id);
    }

    recordFirstMenuCategories(categoryId, category) {
        let categories = category.categories;
        let secondCategories = categories ? [...categories] : [], // 第二级分类
            thirdCategories = [], // 第三级分类
            secondActiveId = '', // 第二级分类被激活的id
            thirdActiveId = '', //第三级分类被激活的id
            secondActiveName = '', // 第二级分类被激活的名称
            thirdActiveName = ''; // 第三级分类被激活的名称

        let item = {
            id: categoryId,
            categories: [],
            name: '全部'
        }
        secondCategories.splice(0, 0, item);
        thirdCategories.splice(0, 0, item);
        secondActiveId = categoryId;
        thirdActiveId = categoryId;
        secondActiveName = '全部';
        thirdActiveName = '全部';
        this.props.onRecordHeaderSearchCategories(secondCategories, thirdCategories, secondActiveId,
            thirdActiveId, secondActiveName, thirdActiveName);
    }

    handleFirstMenuEnter(category, index) {
        let categories = [];
        let menuIndex = -1;
        if (category.categories && category.categories.length > 0) {
            categories = category.categories;
            menuIndex = index;
        }

        let submenuOffsetTop = (40 * index) + 'px';
        this.setState({
            menuIndex: menuIndex,
            categories: categories,
            submenuOffsetTop: submenuOffsetTop
        });
    }

    handleCategoriesLeave() {
        this.setState({
            submenuOffsetTop: '0px',
            menuIndex: -1
        });
    }

    handleClickSubmenu(categoryId: string, activeIndex: number) {
        this.setState({
            activeIndex: activeIndex,
            menuIndex: -1,
        });
        let activeCategory = this.props.categories[activeIndex];
        let secondCategories = activeCategory.categories ? activeCategory.categories : [];
        this.recordSubmenuCategories(categoryId, secondCategories);
        this.props.onChangeCategoryId(categoryId); 
    }

    recordSubmenuCategories(categoryId, categories) {
        debugger
        let secondCategories = categories ? [...categories] : [], // 第二级分类
            thirdCategories = [], // 第三级分类
            secondActiveId = '', // 第二级分类被激活的id
            thirdActiveId = '', //第三级分类被激活的id
            secondActiveName = '', // 第二级分类被激活的名称
            thirdActiveName = ''; // 第三级分类被激活的名称
        let secondCategoriesTemp = categories ? [...categories] : [], // 临时变量
            thirdCategoriesTemp = [];
        for (let i = 0; i < secondCategories.length; i++) {
            if (categoryId === secondCategories[i].id) { // 如果点击的是第二级category menu
                let secondItem = { //第二级的全部节点为当前节点的父节点
                    id: secondCategories[i].parentId,
                    categories: [],
                    name: '全部'
                };
                secondCategoriesTemp.splice(0, 0, secondItem); // 将父节点作为【全部】分类添加进来
                thirdCategoriesTemp = [...secondCategories[i].categories];
                // 设置第三级数据
                let thirdItem = { //添加第三级的全部节点
                    id: secondCategories[i].id,
                    categories: [],
                    name: '全部'
                };
                thirdCategoriesTemp.splice(0, 0, thirdItem);
                secondActiveId = categoryId;
                thirdActiveId = categoryId;
                secondActiveName = secondCategories[i].name;
                thirdActiveName = '全部';
                break;
            } else { // 如果点击的是第三级category menu
                thirdCategories = [...secondCategories[i].categories];
                for (let j = 0; j < thirdCategories.length; j++) {
                    if (categoryId === thirdCategories[j].id) {
                        let secondItem = {
                            id: secondCategories[i].parentId,
                            categories: [],
                            name: '全部'
                        };
                        secondCategoriesTemp.splice(0, 0, secondItem); // 将父节点作为【全部】分类添加进来
                        // 设置第三级数据
                        let thirdItem = {
                            id: secondCategories[i].id,
                            categories: [],
                            name: '全部'
                        };
                        thirdCategoriesTemp = [...secondCategories[i].categories];
                        thirdCategoriesTemp.splice(0, 0, thirdItem);
                        secondActiveId = secondCategories[i].id;
                        thirdActiveId = categoryId;
                        secondActiveName = secondCategories[i].name;
                        thirdActiveName = thirdCategories[j].name;
                        break;
                    }
                }
            }
        }

        secondCategories = secondCategoriesTemp;
        thirdCategories = thirdCategoriesTemp;
        this.props.onRecordHeaderSearchCategories(secondCategories, thirdCategories, secondActiveId,
            thirdActiveId, secondActiveName, thirdActiveName);
    }

    render() {
        let menuList = this.getMenuList();
        return (
            <div className="category-items"
                style={this.props.showCategories ? { display: 'block'} : { display: 'none' }}
                onMouseLeave={this.handleCategoriesLeave.bind(this)}>
                <PerfectScrollbar>
                    {menuList}
                </PerfectScrollbar>
                <CatalogSubmenu categories={this.state.categories}
                    menuIndex={this.state.menuIndex}
                    submenuOffsetTop={this.state.submenuOffsetTop}
                    onSubmenuClick={this.handleClickSubmenu.bind(this)}>
                </CatalogSubmenu>
            </div>
        );
    }
}