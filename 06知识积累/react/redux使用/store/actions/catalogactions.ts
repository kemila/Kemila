import { Product } from '../typedef';

/*
 * action 类型
 */

export const ADD_COMPONENT = 'ADD_COMPONENT';
export const REMOVE_COMPONENT = 'REMOVE_COMPONENT';
export const INIT_COMPONENTS = 'INIT_COMPONENTS';

/**
 * 添加组件
 * @param {string} id
 * @param {string} hash
 * @param {string} name
 * @param {string} url
 * @returns {{type: string; id: string; hash: string; name: string; url: string}}
 */
export function addComponent(id: string, hash: string, name: string, url: string) {
    return {
        type: ADD_COMPONENT,
        id,
        hash,
        name,
        url
    };
}

/**
 * 移除组件
 * @param {string} index
 * @returns {{type: string; index: string}}
 */
export function removeComponent(index: string) {
    return {
        type: REMOVE_COMPONENT,
        index
    };
}

/**
 * 初始化 组件列表
 */
export function initComponents(yamlCode: string, currentProducts: Product[]) {
    return {
        type: INIT_COMPONENTS,
        yamlCode,
        currentProducts
    };
}
