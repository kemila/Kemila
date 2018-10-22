import { Action } from '../../../../redux/action';
import { KV } from '../../../../../lib';
import { ActionKV } from '../../../../redux/define';
import { moduleName, Pages, searchUrl } from '../enums';
import { post } from 'src/app/requset/requestsender';

export default class SearchAction extends Action {
    static Module = moduleName;
    static async Prepare(payload: KV, moduleState: KV): Promise<KV> {
        // payload keeped some search query info
        let { CityCode, RoomArea, RoomSpec, Keywords, Skip, Limit } = moduleState;
        let res = await post(searchUrl, Object.assign({
            CityCode,
            RoomArea,
            RoomSpec,
            Keywords,
            Skip,
            Limit
        }, payload));

        return {
            ...payload,
            page: Pages.list,
            resList: res.items && res.items.length ? res.items : null,
            resTotal: res.total
        };
    }

    static Process(action: ActionKV, moduleState: KV): KV {
        return action.payload;
    }
}