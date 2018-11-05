import  GlobalSearch from '../../../components/catalog/catalogsidebar/globalsearch/globalsearch'; // 直接导入components就可解析
import * as Actions from '../../../actions/catalog';
import { CatalogContentType } from '../../../entity/catalogentity';
import { connect } from 'react-redux';

export function mapStateToProps(state, ownProps) {
    return {
        ...ownProps
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        onChangeCatalogType: () => dispatch(Actions.changeCatalogType(CatalogContentType.GlobalSearchMaterial))
    }
}

export function mergeProps(stateProps: any, dispatchProps: any, ownProps: any) {
    return { ...ownProps, ...stateProps, ...dispatchProps};
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(GlobalSearch);