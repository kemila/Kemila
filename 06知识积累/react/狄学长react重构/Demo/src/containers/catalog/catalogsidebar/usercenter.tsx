import  UserCenter from '../../../components/catalog/catalogsidebar/usercenter/usercenter'; // 直接导入components就可解析
import * as Actions from '../../../actions/catalog';
import { connect } from 'react-redux';

export function mapStateToProps(state, ownProps) {
    return {
        ...ownProps
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        onChangeCatalogType: (catalogType) => dispatch(Actions.changeCatalogType(catalogType))
    }
}

export function mergeProps(stateProps: any, dispatchProps: any, ownProps: any) {
    return { ...ownProps, ...stateProps, ...dispatchProps};
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(UserCenter);