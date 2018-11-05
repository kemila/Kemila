/**
 * @description: catalog对应的接口数据
 * @catalogType: catalog类型
 * @modelsData: 模型数据集合
 * @pageRandom: 记录是否重置页面的一个随机数
 * @categoryId: 模型分类id
 * @isFetching: 是否正在获取数据->用于显示和隐藏loading界面
 * @tenantOperator: value:Eq->查询数据是当前tenant; !Eq->查询数据是素材库
 * @secondCategories: category的第二级menu tree
 */
export interface Catalog {
	catalogType: string,
	modelsData: Array<any>,
	pageRandom: number,
	categoryId: string,
    isFetching: boolean,
	tenantOperator: string,
	secondCategories: Array<any>,
	thirdCategories: Array<any>,
	secondActiveId: string,
	thirdActiveId: string,
	secondActiveName: string,
	thirdActiveName: string,
}

/**
 * @StoreState: 全局state
 */
export interface StoreState {
	Catalog: Catalog,
}