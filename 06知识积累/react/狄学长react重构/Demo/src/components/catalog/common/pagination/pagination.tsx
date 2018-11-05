import * as React from 'react';
import ReactPaginate from 'react-paginate';
import './pagination.scss';

/**
 * @description: 分页组件属性
 * @pageCount: 页数
 * @onChangePageIndex: 将页数变化的值传递给父组件
 */
interface IPaginationProps {
    pageCount: number,
    onChangePageIndex: (val) => void
}

/**
 * @description: 分页组件状态
 * @forcePage: 重置选中的页数
 * @showJumpPage: 是否显示跳转页面
 * @jumpPageIndex: 记录跳转的页面
 * @pageRandom: 页面重置的随机数
 * @pageRange: The range of pages displayed.
 * @marginPages: The number of pages to display for margins.
 */
interface IPaginationStates {
    forcePage: number,
    showJumpPage: boolean,
    jumpPageIndex: number,
    pageRandom: number,
    pageRange: number,
    marginPages: number
}

export default class Pagination extends React.Component<IPaginationProps, IPaginationStates> {
    unsubscribe: any;
    static contextTypes = {
        store: () => { return null },
    };
    constructor(props: IPaginationProps, context) {
        super(props, context);
        this.state = {
            forcePage: 0,
            showJumpPage: false,
            jumpPageIndex: 1,
            pageRandom: 0,
            pageRange: 3,
            marginPages: 1
        };
    }

    componentDidMount() {
        let store = this.context.store;
        if (!store) {
            return;
        }

        this.unsubscribe = store.subscribe(() => {
            if (store.getState().catalog.pageRandom !== this.state.pageRandom) {
                this.setState({
                    pageRandom: store.getState().catalog.pageRandom,
                    forcePage: 0,
                    jumpPageIndex: 1,
                });
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribe(); // 解除监听。
    }

    handleMouseEnter() {
        this.setState({
            showJumpPage: true
        });
    }

    handleMouseLeave() {
         this.setState({
            showJumpPage: false
        });   
    }

    changePage(pageObj) {
        // 1.forcePage的值必须设置,如果不设置,forcePage始终是默认值0.
        // 2.当点击其他的分类按钮时,store.getState().catalog.pageRandom的值会发生变化.
        // 3.此时store.subscribe()会监听到pageRandom的变化,然后会重新设置pageRandom,forcePage,jumpPageIndex的值.
        // 4.而forcePage重置后的值仍为0,没有发生改变,分页的数据便不会被重置.
        this.setState({
            jumpPageIndex: parseInt(pageObj.selected) + 1,
            forcePage: parseInt(pageObj.selected) 
        });

        this.props.onChangePageIndex(parseInt(pageObj.selected));
    }

    changeJumpPage(e) {
        let value = e.target.value;
        this.setState({
            jumpPageIndex: value
        });
    }

    handleKeyPress(e) {
        if (e.charCode === 13) {
            let value;
            if (isNaN(parseInt(e.target.value)) || parseInt(e.target.value) <= 0) {
                value = 1
                this.setState({
                    jumpPageIndex: value
                });
            } else if (parseInt(e.target.value) > this.props.pageCount) {
                value = this.props.pageCount;
                this.setState({
                    jumpPageIndex: value
                });
            } else {
                value = parseInt(e.target.value);
            }

            this.setState({
                forcePage: value - 1,
                showJumpPage: false
            });

            this.props.onChangePageIndex(value - 1);
        }
    }

    jumpToSpecifiedPage() {
        let pageIndex;
        if (isNaN(Number(this.state.jumpPageIndex)) || Number(this.state.jumpPageIndex) <= 0) {
            pageIndex = 1
            this.setState({
                jumpPageIndex: pageIndex
            });
        } else if (Number(this.state.jumpPageIndex) > this.props.pageCount) {
            pageIndex = this.props.pageCount;
            this.setState({
                jumpPageIndex: pageIndex
            });
        } else {
            pageIndex = Number(this.state.jumpPageIndex);
        }
        
        this.setState({
            forcePage: pageIndex - 1,
            showJumpPage: false
        });

        this.props.onChangePageIndex(pageIndex - 1);
    }

    render() {
        let paginationStyle = this.props.pageCount && this.props.pageCount > 0 ? {display: 'block'} : {display: 'none'};
        let jumpPageStyle = this.state.showJumpPage ? {display: 'block'} : {display: 'none'};

        return (
            <div className="pagination-container" style={paginationStyle}>
                <ReactPaginate
                    pageCount={this.props.pageCount}
                    pageRangeDisplayed={this.state.pageRange}
                    marginPagesDisplayed={this.state.marginPages}
                    forcePage={this.state.forcePage}
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    containerClassName={"pagination-control"}
                    previousClassName={"prev-class"}
                    nextClassName={"next-class"}
                    pageClassName={"page-item"}
                    activeClassName={"active"}
                    onPageChange={this.changePage.bind(this)}>
                </ReactPaginate>
                <div className="jump-container">
                    <span className="title" onMouseEnter={this.handleMouseEnter.bind(this)}>跳至</span>
                    <div className="box-area" style={jumpPageStyle} onMouseLeave={this.handleMouseLeave.bind(this)}>
                        <div className="jump-page">
                            <div className="page-info">
                                <input type="text" className="input-control" 
                                    value={this.state.jumpPageIndex} 
                                    onChange={this.changeJumpPage.bind(this)}
                                    onKeyPress={this.handleKeyPress.bind(this)}/>
                                <span className="name">页</span>
                                <span className="jump-btn" onClick={this.jumpToSpecifiedPage.bind(this)}>跳转</span>
                            </div>
                        </div>
                        <span className="dot-bottom"></span>
                    </div>
                </div>
            </div>
        );
    }
}