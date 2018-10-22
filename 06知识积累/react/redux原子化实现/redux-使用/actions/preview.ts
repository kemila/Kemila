import { Action } from 'src/app/redux/action';
import { moduleName } from '../enums';
import { KV } from 'src/lib';
import { ActionKV } from 'src/app/redux/define';

export default class PreviewAction extends Action {
    static Module = moduleName;
    static Process(action: ActionKV, moduleState: KV) {
        return action.payload;
    }
}