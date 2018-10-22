import { partName } from '../..';
console.log('partName' , partName);
// 这边取到的partName 为undefined
export const moduleName = 'dialogs.' + 'housetype';
export enum Pages {
    search,
    list
}
export const pageSize = 6; // 每页显示多少个
export const searchUrl = 'HouseType/HouseTypes'; // 搜索户型
export const citysUrl = 'Parameter/NationalRegions'; // 省市列表
export const currentCityUrl = 'Parameter/CurrentRegion'; // 当前所在城市