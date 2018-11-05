import * as React from 'react';
import ReactLoading from 'react-loading';
import HeaderSearch from '../../../../containers/catalog/catalogcontent/headersearch';
import ModelMaterials from '../modelmaterials/modelmaterials';
import Pagination from '../../common/pagination/pagination';
import './catalogmodel.scss';
/**
 * @description:catalog模型材质组件对应的states
 * @modelsData:模型数据
 * @categoryId:分类id
 * @isFetching:是否向服务获取数据
 * @tenantOperator: 记录是tenant的数据,还是素材库的数据
 */
interface ICatalogModelProps {
    modelsData: Array<any>,
    categoryId: string,
    isFetching: boolean,
    tenantOperator: string,
    onGetCatalogModels: (val) => void,
}

export default class CatalogModel extends React.Component<ICatalogModelProps, any> {
    pageIndex: number;
    unsubscribe: any;
    constructor(props: ICatalogModelProps) {
        super(props);
        this.pageIndex = 0;
    }

    handleChangePageIndex(pageIndex: number) {
        this.pageIndex = pageIndex;
        this.getCatalogModels();
    }

    getCatalogModels() {
        const tenant = 'jtljia';
        let params = {
            categoryId: this.props.categoryId,
            pageIndex: this.pageIndex,
            tenant: tenant,
            tenantOperator: this.props.tenantOperator
        };

        this.props.onGetCatalogModels(params);
    }

    handleChangeHeaderConditions() {
        this.pageIndex = 0;
        this.getCatalogModels();
    }

    render() {
        let models = this.props.modelsData['models'];
        let pageCount = this.props.modelsData['pageCount'];
        let loadingStyle = this.props.isFetching ? 'loading-active' : 'loading-unActive';

        return (
            <div className="catalog-model">
                <HeaderSearch onChangeHeaderConditions={this.handleChangeHeaderConditions.bind(this)}></HeaderSearch>
                <ModelMaterials models={models}></ModelMaterials>
                <Pagination pageCount={pageCount}
                    onChangePageIndex={this.handleChangePageIndex.bind(this)}>
                </Pagination>
                <ReactLoading className={['react-loading', loadingStyle].join(' ')} 
                    type={'spinningBubbles'} 
                    color={'#ffc034'} 
                    height={48} 
                    width={48}>
                </ReactLoading>
            </div>
        );
    }
}