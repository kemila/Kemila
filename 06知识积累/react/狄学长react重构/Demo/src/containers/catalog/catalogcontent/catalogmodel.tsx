import  CatalogModel from '../../../components/catalog/catalogcontent/catalogmodel/catalogmodel'; // 直接导入components就可解析
import { connect } from 'react-redux';
import { getCatalogModels } from '../../../actions/catalog';

export function mapStateToProps(state) {
    return {
        modelsData: state.catalog.modelsData,
        categoryId: state.catalog.categoryId,
        isFetching: state.catalog.isFetching,
        tenantOperator: state.catalog.tenantOperator
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        onGetCatalogModels: (params) => dispatch(getCatalogModels(params)),
    }
}

export function mergeProps(stateProps: any, dispatchProps: any, ownProps: any) {
    return { ...ownProps, ...stateProps, ...dispatchProps};
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CatalogModel);