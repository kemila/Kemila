import { KV } from '../../lib';
import { ActionKV } from './define';

export class Action {
    static Module = 'Module'; // 子类override
    static async Prepare(payload: KV, moduleState: KV): Promise<KV> {
        return payload; // 子类如果需要异步操作数据，可override此方法，返回异步得到的处理过的数据，底层会使用此返回数据调用Process
    }

    /**
     * 只需返回包含[本模块!!!]修改过的属性对象即可，框架层会将其合并到全局store中！！！！
     * @param moduleState 本模块的store快照
     * @param action 动作及附带数据
     */
    static Process(action: ActionKV, moduleState: KV): any {
        return moduleState; // 子类override
    }
}
