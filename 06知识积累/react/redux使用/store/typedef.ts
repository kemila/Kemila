/**
 * 组件信息
 * id
 * 后台查询使用的ID
 * yamlId
 * 作为唯一标识
 */
export interface Product {
    id: string;
    hash: string;
    index: string;
    name: string;
    url: string;
}

export interface StateDef {
    yamlCode?: string;
    currentProducts: Product[];
}