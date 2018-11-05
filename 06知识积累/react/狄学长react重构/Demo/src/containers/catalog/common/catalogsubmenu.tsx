import { connect } from 'react-redux';
import CatalogSubmenu from '../../../components/catalog/common/catalogsubmenu/catalogsubmenu'; // 直接导入components就可解析

export function mapStateToProps(state, ownProps) {
    return {
        activeMenuId: state.catalog.categoryId,
        ...ownProps
    }
}

export function mapDispatchToProps(dispatch) {
    return {
    }
}

export function mergeProps(stateProps: any, dispatchProps: any, ownProps: any) {
    return { ...ownProps, ...stateProps, ...dispatchProps };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CatalogSubmenu);