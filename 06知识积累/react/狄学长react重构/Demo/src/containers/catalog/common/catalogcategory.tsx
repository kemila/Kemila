import { connect } from 'react-redux';
import CatalogCategory from '../../../components/catalog/common/catalogcategory/catalogcategory'; // 直接导入components就可解析
import * as Actions from '../../../actions/catalog';

export function mapStateToProps(state, ownProps) {
    return {
        ...ownProps
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        onRecordHeaderSearchCategories: (secondCategories, thirdCategories, secondActiveId,
            thirdActiveId, secondActiveName, thirdActiveName) => dispatch(Actions.recordHeaderSearchCategories(secondCategories, thirdCategories, secondActiveId,
                thirdActiveId, secondActiveName, thirdActiveName)),
    }
}

export function mergeProps(stateProps: any, dispatchProps: any, ownProps: any) {
    return { ...ownProps, ...stateProps, ...dispatchProps };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CatalogCategory);