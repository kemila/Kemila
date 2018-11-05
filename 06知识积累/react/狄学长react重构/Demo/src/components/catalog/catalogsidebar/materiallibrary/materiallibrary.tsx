import * as React from 'react';
import SidebarItem from '../../common/sidebaritem/sidebaritem';
import CatalogCategory from '../../../../containers/catalog/common/catalogcategory';
// import CatalogCategory from '../../common/catalogcategory/catalogcategory';
import { CatalogSidebarType } from '../../../../entity/catalogentity';
import CatalogService from '../../utils/catalogservice';
import './materiallibrary.scss';
/**
 * @description: 组件MaterialLibrary对应的属性
 * @sidebarType: sidebar 类型
 * @onSidebarTypeChange: 监听sidebar 类型的改变
 */
interface IMaterialLibraryProps {
    sidebarType: string,
    onSidebarTypeChange: (val) => void,
    onChangeCatalogType: () => void,
    onResetCatalogPageIndex: (val) => void,
    onRecordCatalogSearchConditions: (val1, val2) => void,
    onRecordSecondCategories: (val) => void,
    onGetCatalogModels: (val) => void,
    onRecordHeaderSearchCategories?: (v1, v2, v3, v4, v5, v6) => void
}
/**
 * @description: 组件MaterialLibrary对应的state
 * @sidebarType: sidebar 类型('字符串')
 */
interface IMaterialLibraryStates {
    categories: Array<any>
}

export default class MaterialLibrary extends React.Component<IMaterialLibraryProps, IMaterialLibraryStates> {
    //保存子组件,用来调用子组件中的方法
    childComponet: any;
    constructor(props: IMaterialLibraryProps) {
        super(props);
        this.state = {
            categories: [],
        };
        this.childComponet = null;
    }

    componentWillMount() {
        let params = 'name=__all__&depth=-1&tenant=qu&type=Common';
        let catalogService = CatalogService.getInstance();
        catalogService.getCategories(params).then(result=> {
            if (!result.data || !result.data.items || result.data.items.length === 0) {
                return;
            }

            this.setState({
                categories: result.data.items
            });
        });
    }

    handleSidebarTypeChange() {
        //1.如果在[素材库]下,点击[素材库]按钮,不做任何改变
        if (this.props.sidebarType === CatalogSidebarType.MaterialLibrary) {
            return;
        }
        //2.如果不在[素材库]下,点击[素材库]按钮,[素材库]按钮被激活
        this.props.onSidebarTypeChange(CatalogSidebarType.MaterialLibrary);
        //3.重置子组件[CatalogCategory]下拉按钮的激活状态
        let categoryId = '';
        if (this.state.categories.length > 0) {
            categoryId = this.state.categories[1].id;
            let activeIndex = 1;
            this.childComponet.resetActiveMenu(activeIndex);
            this.recordFirstMenuCategories(categoryId, this.state.categories[1]);
        }
        //4.加载Catalog Content组件模板
        this.props.onChangeCatalogType();
        //5.通过随机数的变化,重置分页数据
        let random = Math.random();
        this.props.onResetCatalogPageIndex(random);
        //6.记录选中的分类id并获取Catalog的模型数据进行填充
        const tenant = 'jtljia', tenantOperator = '!Eq';
        this.props.onRecordCatalogSearchConditions(categoryId, tenantOperator);
        let params = {
            categoryId: categoryId,
            pageIndex: 0,
            tenant: tenant,
            tenantOperator: tenantOperator
        };
        this.props.onGetCatalogModels(params);
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

    handleChangeCategoryId(categoryId: string) {
        //1.通过随机数的变化,重置分页数据
        let random = Math.random();
        this.props.onResetCatalogPageIndex(random);
        //2.记录选中的分类id并获取Catalog的模型数据进行填充
        // 并且记录category第二级之后的menu tree
        const tenant = 'jtljia', tenantOperator = '!Eq';
        this.props.onRecordCatalogSearchConditions(categoryId, tenantOperator);
        let params = {
            categoryId: categoryId,
            pageIndex: 0,
            tenant: tenant,
            tenantOperator: tenantOperator
        };
        this.props.onGetCatalogModels(params);
    }

    onRef(ref) {
        this.childComponet = ref;
    }

    render() {
        let showCategories = this.props.sidebarType === CatalogSidebarType.MaterialLibrary;

        return (
            <div className="material-library">
                <SidebarItem sidebarMenuName="素材库"
                    normalImg="./material.svg"
                    activeImg="./material_light.svg"
                    showCategories={showCategories}
                    isNotGlobalSearch={true}
                    onSidebarTypeChange={this.handleSidebarTypeChange.bind(this)}
                >
                </SidebarItem>
                <CatalogCategory categories={this.state.categories}
                    showCategories={showCategories}
                    onRef={this.onRef.bind(this)}
                    onChangeCategoryId={this.handleChangeCategoryId.bind(this)}>
                </CatalogCategory>
            </div>
        );
    }
}