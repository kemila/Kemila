import * as React from 'react';
import SidebarItem from '../../common/sidebaritem/sidebaritem';
import { CatalogSidebarType, CatalogContentType } from '../../../../entity/catalogentity';
import './usercenter.scss';
/**
 * @description: 组件UserCenter对应的属性
 * @sidebarType: sidebar 类型
 * @onSidebarTypeChange: 监听sidebar 类型的改变
 */
interface IUserCenterProps {
    sidebarType: string,
    onSidebarTypeChange: (val) => void,
    onChangeCatalogType: (val) => void,
}
/**
 * @description: 组件UserCenter对应的states
 * @type: 记录当前category的类型
 */
interface IUserCenterStates {
    type: string
}

export default class UserCenter extends React.Component<IUserCenterProps, IUserCenterStates> {
    constructor(props: IUserCenterProps) {
        super(props);
        this.state = {
            type: CatalogContentType.UserCollection
        };
    }

    changeCatalogType(type: string) {
        this.props.onChangeCatalogType(type);
        this.setState({
            type: type
        });
    }

    handleSidebarTypeChange() {
        this.props.onSidebarTypeChange(CatalogSidebarType.UserCenter);
        this.props.onChangeCatalogType(CatalogContentType.UserCollection);
    }

    render() {
        let showCategories = this.props.sidebarType === CatalogSidebarType.UserCenter;

        return (
            <div className="user-center">
                <SidebarItem sidebarMenuName="用户中心"
                    normalImg="./user.svg"
                    activeImg="./user_light.svg"
                    showCategories={showCategories}
                    isNotGlobalSearch={true}
                    onSidebarTypeChange={this.handleSidebarTypeChange.bind(this)}
                >
                </SidebarItem>
                <div className="category-items"
                    style={showCategories ? { display: 'block' } : { display: 'none' }}>
                    <div className={['item', this.state.type === CatalogContentType.UserCollection ? 'active' : ''].join(' ')}
                        onClick={this.changeCatalogType.bind(this, CatalogContentType.UserCollection)}>
                        <div className="first-menu-name menu-name">我的收藏</div>
                    </div>
                    <div className={['item', this.state.type === CatalogContentType.UserUsed ? 'active' : ''].join(' ')}
                        onClick={this.changeCatalogType.bind(this, CatalogContentType.UserUsed)}>
                        <div className="first-menu-name menu-name">我的使用</div>
                    </div>
                    <div className={['item', this.state.type === CatalogContentType.UserUploaded ? 'active' : ''].join(' ')}
                        onClick={this.changeCatalogType.bind(this, CatalogContentType.UserUploaded)}>
                        <div className="first-menu-name menu-name">我的上传</div>
                    </div>
                </div>
            </div>
        );
    }
}