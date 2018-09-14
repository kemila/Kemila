import { ADD_COMPONENT, REMOVE_COMPONENT , INIT_COMPONENTS } from '../actions';
import { StateDef , Product } from '../typedef';
import * as YamlUtil from '../../utils/yamlutil';

interface ActionDef {
    id?: string; // catalog组件id
    hash?: string;
    index?: string; // yaml组件 id
    type: string;
    currentProducts: Product[];
}

let reducerHandlers = {
    [ADD_COMPONENT]: (preState, action) => {
        let state = Object.assign({}, preState);
        let id = action.id;
        let hash = action.hash;
        let name = action.name;
        let url = action.url;
        let ret = YamlUtil.addComponent(state.yamlCode, hash);
        state.currentProducts.push({
            id,
            hash,
            index: ret.index,
            name,
            url
        });
        state.yamlCode = ret.yamlCode;
        return state;
    },

    [REMOVE_COMPONENT]: (preState, action) => {

        let state = Object.assign({}, preState);
        let res = YamlUtil.removeComponent(state.yamlCode, parseInt(action.index, 0));
        state.yamlCode = res.yamlCode;

        let map = preState.currentProducts.reduce((prev, item) => {
            prev[item.hash] = item;
            return prev;
        }, {});

        console.log(map);

        state.currentProducts = res.currentProducts.map(( item , ind ) => {
            let tmp = map[item.hash];
            return {
                id: tmp.id,
                hash: item.hash,
                index: item.index,
                name: tmp.name,
                url: tmp.url
            };
        });
        return state;
    },

    [INIT_COMPONENTS]: (preState, action) => {
        let map = preState.currentProducts.reduce((prev, item) => {
            prev[item.hash] = item;
            return prev;
        }, {});

        let state = Object.assign({}, preState);
        state.yamlCode = action.yamlCode || '';
        state.currentProducts = action.currentProducts;

        state.currentProducts = state.currentProducts.map(item => {
            let info = map[item.hash] || {};
            return {...item, id: info.id, name: info.name, url: info.url};
        });

        return state;
    }

};
//定义初始化了 state结构{ yamlCode: '' , currentProducts: [] }
export default function(state: StateDef = { yamlCode: '' , currentProducts: [] }, action: ActionDef) {
    let type = action.type;
    let handler = reducerHandlers[type];

    if (handler) {
        return handler(state, action);
    }
    return state;
}
