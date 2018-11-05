import Service from '../../../api/service';
import CatalogCache from './catalogcache';

interface ISearchConditions {
    categoryId: string,
    pageIndex: number,
    tenant: string,
    tenantOperator: string	
}

export default class CatalogService {
    service: any;
    catalogCache: any;
    eachRequestCount: number;
    eachPagerCount: number;
    interval: number;
    static _instance;

    constructor() {
        this.eachRequestCount = 100;                   //每次向服务查询的数据数目
        this.eachPagerCount = 20;                      //每页显示的数目
        this.interval = 5;                             //每5页为一个间距
        this.service = Service.getInstance();
        this.catalogCache = CatalogCache.getInstance();
    }

    getCategories(params) {
        return this.service.getCategories(params).then((result) => {
            return result;
        }).catch((error) => {
            console.error('Search Categories error:' + error);
        });
    }

    getSearchConditions(params: ISearchConditions) {
        let count = Math.floor(params.pageIndex / this.interval);
        let skip = count * this.eachRequestCount;
        let conditions = {
            Skip: skip,
            Limit: this.eachRequestCount,
            CatalogMenuId: params.categoryId,
            PackageId: '',
            CategoryId: '',
            BrandId: '',
            Color: '',
            Style: '',
            Facets: '',
            tenantOperator: params.tenantOperator,
            Tenant: params.tenant,
            Keywords: ''
        };

        return conditions;
    }

    getCatalogModels(params: ISearchConditions) {
        let cacheId = this.createCacheId(params);
        let pageContext = this.catalogCache.getPageContext(cacheId);
        if (pageContext) {
            return this.getModelsFromCache(pageContext, params.pageIndex);
        } else {
            return this.getModelsFromServer(cacheId, params);
        }
    }

    getModelsFromCache(pageContext: any, pageIndex: number) {
        let index = pageIndex % this.interval;
        let cacheModels = pageContext.models;
        let models = cacheModels.slice(index * this.eachPagerCount, (index + 1) * this.eachPagerCount);
        let modelsData = this.getNotifyResolveData(models, pageContext.pageCount, pageContext.total);

        return Promise.resolve(modelsData);
    }

    getModelsFromServer(cacheId: string, params: ISearchConditions) {
        let conditions = this.getSearchConditions(params);
        return this.service.getCatalogModels(conditions).then((result) => {
            let modelsData;
            if (!result || !result.data || !result.data.items || result.data.total === 0) {
                let models = [], total = 0, pageCount = 0;
                modelsData = this.getNotifyResolveData(models, pageCount, total);
                return Promise.resolve(modelsData);
            }

            let pageCount = Math.ceil(result.data.total / this.eachPagerCount);
            let models = result.data.items;
            let total = result.data.total;
            let cacheData = {
                models: models,
                pageCount: pageCount,
                total: total
            };
            this.catalogCache.setPageContext(cacheId, cacheData);
            let pageIndex = params.pageIndex % this.interval;
            let sliceModels = models.slice(pageIndex * this.eachPagerCount, (pageIndex + 1) * this.eachPagerCount);
            modelsData = this.getNotifyResolveData(sliceModels, pageCount, total);
           
            return modelsData;
        }).catch((error) => {
            console.error('Search Catalog Models error:' + error);
        });
    }

    getNotifyResolveData(models: Array<any>, pageCount: number, total: number) {
        let modelsData = [];
        modelsData['models'] = models;
        modelsData['pageCount'] = pageCount;
        modelsData['total'] = total;

        return modelsData;
    }

    createCacheId(params: ISearchConditions) {
        let cacheId = '';
        //@pageMark:记录页码标记:eg:(1-5页:pageMark=1; 6-10页: pageMark=2;...)
        let pageMark = Math.ceil((params.pageIndex + 1) / this.interval);
        cacheId = params.categoryId + pageMark;

        return cacheId;
    }

    static getInstance() {
        CatalogService._instance = CatalogService._instance ||
            new CatalogService();

        return CatalogService._instance;
    }
}