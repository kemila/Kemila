import { connect } from 'react-redux';
import  MaterialLibrary from '../../../components/catalog/catalogsidebar/materiallibrary/materiallibrary'; // 直接导入components就可解析
import * as Actions from '../../../actions/catalog';
import { CatalogContentType } from '../../../entity/catalogentity';
import { getCatalogModels } from '../../../actions/catalog';

export function mapStateToProps(state, ownProps) {
    return {
        ...ownProps
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        onChangeCatalogType: () => dispatch(Actions.changeCatalogType(CatalogContentType.CatalogModel)),
        onResetCatalogPageIndex: (random) => dispatch(Actions.resetCatalogPageIndex(random)),
        onRecordCatalogSearchConditions: (categoryId, tenantOperator) => dispatch(Actions.recordCatalogSearchConditions(categoryId, tenantOperator)),
        onGetCatalogModels: (params) => dispatch(getCatalogModels(params)),
        onRecordHeaderSearchCategories: (secondCategories, thirdCategories, secondActiveId,
            thirdActiveId, secondActiveName, thirdActiveName) => dispatch(Actions.recordHeaderSearchCategories(secondCategories, thirdCategories, secondActiveId,
                thirdActiveId, secondActiveName, thirdActiveName)),
    }
}

export function mergeProps(stateProps: any, dispatchProps: any, ownProps: any) {
    return { ...ownProps, ...stateProps, ...dispatchProps};
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MaterialLibrary);