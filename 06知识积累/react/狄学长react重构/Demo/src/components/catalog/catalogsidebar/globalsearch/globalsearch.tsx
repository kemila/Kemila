import * as React from 'react';
import SidebarItem from '../../common/sidebaritem/sidebaritem';
import { CatalogSidebarType } from '../../../../entity/catalogentity';
import './globalsearch.scss';

/**
 * @description: 组件GlobalSearch对应的属性
 * @sidebarType: sidebar 类型
 * @onSidebarTypeChange: 监听sidebar 类型的改变
 */
interface IGlobalSearchProps {
    sidebarType: string,
    onSidebarTypeChange: (val) => void,
    onChangeCatalogType: () => void
}

export default class GlobalSearch extends React.Component<IGlobalSearchProps, any> {
    constructor(props: IGlobalSearchProps) {
        super(props);
    }

    handleSidebarTypeChange() {
        this.props.onSidebarTypeChange(CatalogSidebarType.GlobalSearch);
        this.props.onChangeCatalogType();
    }

    render() {
        let showCategories = this.props.sidebarType === CatalogSidebarType.GlobalSearch;

        return(
            <SidebarItem sidebarMenuName="全局搜索"
                normalImg="./search.svg"
                activeImg="./search_light.svg"
                showCategories={showCategories}
                isNotGlobalSearch={false}
                onSidebarTypeChange={this.handleSidebarTypeChange.bind(this)}
            >
            </SidebarItem>
        );
    }
}