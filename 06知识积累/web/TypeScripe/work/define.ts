
export interface KV {
    [k: string]: any;
}
export type V = number | string | boolean;

export type Class<T> = {
    new(...args: any[]): T,
    [k: string]: any;
};

export type ActionKV = {
    type: string;
    module?: string;
    payload?: any
};
export type PrepareFn = (payload: KV, moduleState: KV) => Promise<KV>;
export type ReducerFn = (action: ActionKV, moduleState: KV) => KV;

export type AnyClass = Class<any>;
export type ActionClass = AnyClass & {
    Module: string; // 模块名
    Action: string; // 动作名
    Prepare: PrepareFn; // 如果是异步动作，通过提供此方法来获取数据，并返回获取的数据，返回的数据会被外层manager传给Process来处理
    Process: ReducerFn;
};

export interface ModuleStore extends KV {
    module: string;
}