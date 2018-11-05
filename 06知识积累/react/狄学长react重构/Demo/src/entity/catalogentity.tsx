/**
 * @description: Catalog Sidebar的枚举类型
 * @GlobalSearch: 全局搜索
 * @FreeDesign: 自由设计
 * @MaterialLibrary: 素材库
 * @Tenant: 定制厂商
 * @UserCenter: 用户中心
 */
export enum CatalogSidebarType {
    GlobalSearch = 'GlobalSearch',
    FreeDesign = 'FreeDesign',
    MaterialLibrary = 'MaterialLibrary',
    Tenant = 'Tenant',
    UserCenter = 'UserCenter'
}
/**
 * @description: Catalog content的显示枚举类型
 * @GlobalSearchMaterial: 全局搜索材质和模型
 * @HouseDesign: 户型设计
 * @Hydropower: 水电设计
 * @CatalogModel: catalog 模型
 * @UserCollection: 我的收藏
 * @UserUsed: 我的使用
 * @UserUploaded: 我的上传
 */
export enum CatalogContentType {
    GlobalSearchMaterial = 'GlobalSearchMaterial',
    HouseDesign = 'HouseDesign',
    Hydropower = 'Hydropower',
    CatalogModel = 'CatalogModel',
    UserCollection = 'UserCollection',
    UserUsed = 'UserUsed',
    UserUploaded = 'UserUploaded'
}