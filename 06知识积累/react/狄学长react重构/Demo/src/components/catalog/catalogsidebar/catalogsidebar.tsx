import * as React from 'react';
import GlobalSearch from '../../../containers/catalog/catalogsidebar/globalsearch';
import FreeDesign from '../../../containers/catalog/catalogsidebar/freedesign';
import Tenant from  '../../../containers/catalog/catalogsidebar/tenant';
import MaterialLibrary from '../../../containers/catalog/catalogsidebar/materiallibrary';
import UserCenter from '../../../containers/catalog/catalogsidebar/usercenter';
import { CatalogSidebarType } from '../../../entity/catalogentity';
import './catalogsidebar.scss';

/**
 * @description: 组件CatalogSidebar对应的state
 * @sidebarType: sidebar 类型('字符串')
 */
interface ICatalogSidebarStates {
    sidebarType: string,
}

export default class CatalogSidebar extends React.Component<any, ICatalogSidebarStates> {
    constructor(props) {
        super(props);
        this.state = {
            sidebarType: CatalogSidebarType.GlobalSearch
        };
    }

    handleSidebarTypeChange(sidebarType) {
        this.setState({
            sidebarType: sidebarType
        });
    }

    render() {
        return(
            <div className="catalog-sidebar">
                <GlobalSearch sidebarType={this.state.sidebarType}
                    onSidebarTypeChange={this.handleSidebarTypeChange.bind(this)} />
                <FreeDesign sidebarType={this.state.sidebarType}
                    onSidebarTypeChange={this.handleSidebarTypeChange.bind(this)} />
                <Tenant sidebarType={this.state.sidebarType}
                    onSidebarTypeChange={this.handleSidebarTypeChange.bind(this)} />
                <MaterialLibrary sidebarType={this.state.sidebarType}
                    onSidebarTypeChange={this.handleSidebarTypeChange.bind(this)} />
                <UserCenter sidebarType={this.state.sidebarType}
                    onSidebarTypeChange={this.handleSidebarTypeChange.bind(this)} />
            </div>
        );
    }
}