import * as React from 'react';
import SidebarMenuImgMap from './sidebarmenumap';
import './sidebarItem.scss';

/**
 * @description: SidebarItem
 * @sidebarMenuName: sidebar 菜单按钮名称
 * @sidebarType: sidebar 类型
 * @normalImg: 普通状态下显示的图片
 * @activeImg: 激活状态下显示的图片
 * @showCategories: 是否显示对应的下拉菜单
 * @isNotGlobalSearch: 不是全局搜索
 * @onSidebarTypeChange: 监听sidebar 类型的改变
 */
export interface ISidebarItemProps {
    sidebarMenuName: string,
    normalImg: string,
    activeImg: string,
    showCategories: boolean,
    isNotGlobalSearch: boolean,
    onSidebarTypeChange: () => void,
}
/**
 * @description: SidebarItem
 * @display: 是否显示每个图标右侧的提示信息
 */
export interface ISidebarItemStates {
    display: boolean
}
export default class SidebarItem extends React.Component<ISidebarItemProps, ISidebarItemStates> {
    constructor(props: ISidebarItemProps) {
        super(props);
        this.state = {
            display: false,
        };
    }

    mouseEnter() {
        this.setState({
            display: true
        });
    }

    mouseLeave() {
        this.setState({
            display: false
        });
    }

    handleClick() {
        this.props.onSidebarTypeChange();
    }

    render() {
        let normalImg = SidebarMenuImgMap[this.props.normalImg];
        let activeImg = SidebarMenuImgMap[this.props.activeImg];
        let normalImgStyle = (!this.state.display && !this.props.showCategories)
            ? { display: 'block' }
            : { display: 'none' };
        let activeImgStyle = (this.state.display || this.props.showCategories) 
            ? { display: 'block' }
            : { display: 'none' };
        let markInfoStyle = this.state.display 
            ? { display: 'flex' } 
            : { display: 'none' };
        let triangleStyle = this.props.showCategories && this.props.isNotGlobalSearch
            ? { display: 'block' } 
            : { display: 'none' };

        return (
            <div className="sidebar-item"
                onMouseEnter={this.mouseEnter.bind(this)}
                onMouseLeave={this.mouseLeave.bind(this)}
                onClick={this.handleClick.bind(this)}>
                <img src={normalImg}
                    style={normalImgStyle} />
                <img src={activeImg}
                    style={activeImgStyle} />
                <div className="mark-info"
                    style={markInfoStyle}>
                    {this.props.sidebarMenuName}
	            </div>
                <div className="triangle-border-up"
                    style={triangleStyle}>
                    <span></span>
                </div>
            </div>
        );
    }
}