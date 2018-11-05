/**
 * @component actions
 * @description catalog动作和函数
 **/
import * as constants from '../constants/catalog';
import CatalogService from '../components/catalog/utils/catalogservice';
//=======1========
export interface ICatalogType {
	type: constants.CHANGE_CATALOG_TYPE,
	payLoad: string
}
/**
 * @description: 更改catalog类型
 * @param catalogType : 类型值
 */
export function changeCatalogType(catalogType: string): ICatalogType {
	return {
		type: constants.CHANGE_CATALOG_TYPE,
		payLoad: catalogType
	}
}
//=======2========
export interface IPageIndex {
	type: constants.RESET_CATALOG_PAGEINDEX,
	payLoad: number
}
/**
 * @description: 重置catalog分页数据
 * @param random : 随机数
 */
export function resetCatalogPageIndex(random: number): IPageIndex {
	return {
		type: constants.RESET_CATALOG_PAGEINDEX,
		payLoad: random
	}
}
//=======3========
export interface ICategoryId {
	type: constants.RECORD_SELECTED_CATEGORY_ID,
	payLoad: string
}
/**
 * @description: 记录被选中的category id
 * @param categoryId : 分类id
 */
export function recordSelectedCategoryId(categoryId: string): ICategoryId {
	return {
		type: constants.RECORD_SELECTED_CATEGORY_ID,
		payLoad: categoryId
	}
}
//=======4========
export interface ICatalogRequest {
	type: constants.CATALOG_MODELS_REQUEST,
	payLoad: boolean
}

export function changeCatalogRequestState(isFetching: boolean): ICatalogRequest {
	return {
		type:  constants.CATALOG_MODELS_REQUEST,
		payLoad: isFetching
	}
}

//=======5========
export interface ICatalogReceive {
	type: constants.CATALOG_MODELS_RECEIVE,
	modelsData: Array<any>,
    isFetching: boolean
}

export function changeCatalogReceiveState(modelsData: Array<any>, isFetching: boolean): ICatalogReceive {
	return {
		type:  constants.CATALOG_MODELS_RECEIVE,
		modelsData: modelsData,
        isFetching: isFetching
	}
}
//=======6========
export interface ICatalogConditions {
	type: constants.RECORD_CATALOG_SEARCH_CONDITIONS,
	categoryId: string,
	tenantOperator: string
}

export function recordCatalogSearchConditions(categoryId: string, tenantOperator: string): ICatalogConditions {
	return {
		type: constants.RECORD_CATALOG_SEARCH_CONDITIONS,
		categoryId: categoryId,
		tenantOperator: tenantOperator
	}
}
//=======7========
export interface IHeaderSearchCategories {
	type: constants.RECORD_HEADER_SEARCH_CATEGORIES,
	secondCategories: Array<any>,
	thirdCategories: Array<any>,
	secondActiveId: string,
	thirdActiveId: string,
	secondActiveName: string,
	thirdActiveName: string,
}

export function recordHeaderSearchCategories(secondCategories: Array<any>,
											thirdCategories: Array<any>,
											secondActiveId: string,
											thirdActiveId: string,
											secondActiveName: string,
											thirdActiveName: string): IHeaderSearchCategories {
	return {
		type: constants.RECORD_HEADER_SEARCH_CATEGORIES,
		secondCategories: secondCategories,
		thirdCategories: thirdCategories,
		secondActiveId: secondActiveId,
		thirdActiveId: thirdActiveId,
		secondActiveName: secondActiveName,
		thirdActiveName: thirdActiveName
	}
}

//=======8========
interface ISearchConditions {
	categoryId: string,
	pageIndex: number,
	tenant: string,
	tenantOperator: string	
}
/**
 * @description: 获取catalog模型数据
 * @param params : 查询条件集合
 */
export function getCatalogModels(params: ISearchConditions) {
	return (dispatch) => {
		let isFetching = true;
		dispatch(changeCatalogRequestState(isFetching));
		const catalogService = CatalogService.getInstance();
		catalogService.getCatalogModels(params).then(modelsData => {
            isFetching = false;
			dispatch(changeCatalogReceiveState(modelsData, isFetching));
		}).catch(error => {
			console.error('getCatalogModels error:' + error);
		});
	}
}

export type All = ICatalogType 
				| IPageIndex 
				| ICategoryId
				| ICatalogRequest
				| ICatalogReceive
				| ICatalogConditions
				| IHeaderSearchCategories;