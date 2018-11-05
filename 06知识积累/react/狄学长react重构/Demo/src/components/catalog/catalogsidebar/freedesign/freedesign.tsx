import * as React from 'react';
import SidebarItem from '../../common/sidebaritem/sidebaritem';
import { CatalogSidebarType, CatalogContentType } from '../../../../entity/catalogentity'
import './freedesign.scss';

/**
 * @description: 组件FreeDesign对应的属性
 * @sidebarType: sidebar 类型
 * @onSidebarTypeChange: 监听sidebar 类型的改变
 */
interface IFreeDesignProps {
    sidebarType: string,
    onSidebarTypeChange: (val) => void,
    onChangeCatalogType: (val) => void,
}

/**
 * @description: 自由设计组件对应的states
 * @type: 记录当前category的类型
 */
interface IFreeDesignStates {
    type: string
}

export default class FreeDesign extends React.Component<IFreeDesignProps, IFreeDesignStates> {
    constructor(props: IFreeDesignProps) {
        super(props);
        this.state = {
            type: CatalogContentType.HouseDesign
        };
    }

    changeCatalogType(type: string) {
        this.props.onChangeCatalogType(type);
        this.setState({
            type: type
        });
    }

    handleSidebarTypeChange() {
        this.props.onSidebarTypeChange(CatalogSidebarType.FreeDesign);
        this.props.onChangeCatalogType(CatalogContentType.HouseDesign);
    }

    render() {
        let showCategories = this.props.sidebarType === CatalogSidebarType.FreeDesign;

        return (
        	<div className="free-design">
                <SidebarItem sidebarMenuName="绘制户型"
                    normalImg="./design.svg"
                    activeImg="./design_light.svg"
                    showCategories={showCategories}
                    isNotGlobalSearch={true}
                    onSidebarTypeChange={this.handleSidebarTypeChange.bind(this)}
                >
                </SidebarItem>
                <div className="category-items"
                    style={showCategories ? { display: 'block' } : { display: 'none' }}>
                    <div className={['item', this.state.type === CatalogContentType.HouseDesign ? 'active' : ''].join(' ')}
                        onClick={this.changeCatalogType.bind(this, CatalogContentType.HouseDesign)}>
                        <div className="first-menu-name menu-name">户型</div>
                    </div>
                    <div className={['item', this.state.type === CatalogContentType.Hydropower ? 'active' : ''].join(' ')} 
                        onClick={this.changeCatalogType.bind(this, CatalogContentType.Hydropower)}>
                        <div className="first-menu-name menu-name">水电</div>
                    </div>
	            </div>
        	</div>
        );
    }
}