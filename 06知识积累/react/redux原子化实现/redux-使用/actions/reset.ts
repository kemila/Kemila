import { Action } from 'src/app/redux/action';
import { moduleName } from '../enums';
import { KV } from 'src/lib';
import { ActionKV } from 'src/app/redux/define';
import { initStore } from '..';

export default class ResetAction extends Action {
    static Module = moduleName;
    static Process(action: ActionKV, moduleState: KV) {
        // 将内存中的store重置为初始值，以清除搜索数据
        return initStore;
    }
}