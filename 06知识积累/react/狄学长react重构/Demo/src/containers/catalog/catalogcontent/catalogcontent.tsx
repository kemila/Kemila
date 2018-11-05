import  CatalogContent from '../../../components/catalog/catalogcontent/catalogcontent'; // 直接导入components就可解析
import { StoreState } from '../../../entity/storeentity';
import { connect } from 'react-redux';

/***
 * ```mapStateToProps```，可以将当前store的数据作为消息传给我们组件需要shape。
 * ```mapDispatchToProps```，可以创建回调属性来使用```dispatch```函数将行为推送到我们的store。
* */
export function mapStateToProps(state: StoreState) {
    return {
        catalogType: state['catalog'].catalogType
    }
}

/**
 * ```mapDispatchToProps```是一个采用调度程序功能的函数。
 * 此调度程序功能可以将操作传递到我们的存储中进行更新，
 * 因此我们可以创建一对可以根据需要调用调度程序的回调函数。
* */

export function mapDispatchToProps(dispatch) {
    return {}
}

export function mergeProps(stateProps: any, dispatchProps: any, ownProps: any) {
    return { ...ownProps, ...stateProps, ...dispatchProps};
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CatalogContent);