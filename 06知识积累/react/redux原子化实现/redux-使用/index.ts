import { ActionClass, ReducerFn, ModuleStore } from './define';
import { connect } from 'react-redux';
import { createStore } from 'redux';

let _actionReducers = new Map<string, ReducerFn>();
let _initStore = {};
export const globalModel = { store: null };

const reducer = (state, action) => {
    let type = action.type;
    let rdcr = _actionReducers.get(type);
    if (rdcr) {
        let copy = { ...state };
        if (action.module) {
            // 按moduleStore处理
            let moduleStore = copy[action.module];
            let moduleModify = rdcr(action, moduleStore);
            copy[action.module] = Object.assign(moduleStore, moduleModify);
        } else {
            // 非moduleStore的话，兼容原始的全局reducer方式
            copy = Object.assign(copy, rdcr(action, copy));
        }
        return copy;
    }
    return state;
};

export function regAction(cls: ActionClass) {
    _actionReducers.set(`${cls.Module}.${cls.name}`, cls.Process);
}

export function doActiion(actionCls: ActionClass, payload?: any) {
    let action = {
        module: actionCls.Module,
        type: actionCls.Module + '.' + actionCls.name,
        payload: payload
    };

    let moduleState = globalModel.store.getState()[actionCls.Module];
    actionCls.Prepare(payload, moduleState).then(data => {
        delete actionCls.async;
        action.payload = data;
        globalModel.store.dispatch(action);
    });
}

/**
 * 组件装饰器，用于给组件类添加模块store-> local props的属性映射
 * @param moduleName 模块名，便于在全局store里标识所属的业务模块
 * @param props 要映射的字段名数组，eg:['aa','bb'],对应于全局store里的[moduleName.aa]\[moduleName.bb]
 */
export function mapProp(moduleName: string, ...props: string[]): Function {
    return function (target: any) {
        if (!target.__mapedProps__) {
            target.__mapedProps__ = true;

            return connect(state => {
                let st = {};
                props.forEach(key => {
                    let mdStore = state[moduleName];
                    if (mdStore) {
                        st[key] = mdStore[key];
                    } else {
                        throw 'please inject module-store to global by call regStore() first of all.';
                    }
                });
                return st;
            })(target);

        }

    };
}

export function regStore(moduleStore: ModuleStore) {
    let mdNm = moduleStore.module;
    delete moduleStore.module;
    _initStore[mdNm] = moduleStore;

    console.log('regstore', mdNm);

    globalModel.store = createStore(reducer, _initStore);
}