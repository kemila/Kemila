import HeaderSearch from '../../../components/catalog/catalogcontent/headersearch/headersearch'; // 直接导入components就可解析
import { connect } from 'react-redux';
import * as Actions from '../../../actions/catalog';

export function mapStateToProps(state, ownProps) {
    return {
        secondCategories: state.catalog.secondCategories,
        thirdCategories: state.catalog.thirdCategories,
        secondActiveId: state.catalog.secondActiveId,
        thirdActiveId: state.catalog.thirdActiveId,
        secondActiveName: state.catalog.secondActiveName,
        thirdActiveName: state.catalog.thirdActiveName,
        tenantOperator: state.catalog.tenantOperator,
        ...ownProps
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        onRecordHeaderSearchCategories: (secondCategories, thirdCategories, secondActiveId,
            thirdActiveId, secondActiveName, thirdActiveName) => dispatch(Actions.recordHeaderSearchCategories(secondCategories, thirdCategories, secondActiveId,
                thirdActiveId, secondActiveName, thirdActiveName)),
        onRecordCatalogSearchConditions: (categoryId, tenantOperator) => dispatch(Actions.recordCatalogSearchConditions(categoryId, tenantOperator)),
        onResetCatalogPageIndex: (random) => dispatch(Actions.resetCatalogPageIndex(random)),
    }
}

export function mergeProps(stateProps: any, dispatchProps: any, ownProps: any) {
    return { ...ownProps, ...stateProps, ...dispatchProps };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(HeaderSearch);