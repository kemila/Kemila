import { Action } from 'src/app/redux/action';
import { moduleName, citysUrl, currentCityUrl } from '../enums';
import { KV } from 'src/lib';
import { ActionKV } from 'src/app/redux/define';
import { get } from 'src/app/requset/requestsender';

export default class InitCitysAction extends Action {
    static Module = moduleName;

    static async Prepare(payload: KV, moduleState: KV): Promise<KV> {
        if (!moduleState.citys.length) {

            let res = await get(citysUrl);
            let citys = {};
            if (res.items && res.items.length) {
                res.items.map(item => {
                    if (item.Children.length) {
                        citys[item.Name] = item.Children.map(city => {
                            return {
                                CityCode: city.Code,
                                CityName: city.Name,
                            };
                        });

                    } else {
                        citys[item.Name] = [{
                            CityCode: item.Code,
                            CityName: item.Name
                        }];
                    }
                });
            }

            let curcity = await get(currentCityUrl);
            let currentCity = curcity.items;

            return {
                citys,
                currentCity,
                CityCode: currentCity.CityCode
            };
        }

        return {};
    }

    static Process(action: ActionKV, moduleState: KV): any {
        return action.payload;
    }
}