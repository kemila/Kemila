import HouseDesign from '../catalogcontent/housedesign/housedesign';
import GlobalSearchMaterial from '../catalogcontent/globalsearchmaterial/globalsearchmaterial';
import Hydropower from '../catalogcontent/hydropower/hydropower';
import CatalogModel from '../../../containers/catalog/catalogcontent/catalogmodel';
import UserCollection from '../catalogcontent/usercollection/usercollection';
import UserUsed from '../catalogcontent/userused/userused';
import UserUploaded from '../catalogcontent/useruploaded/useruploaded';
import { CatalogContentType } from '../../../entity/catalogentity';

const ComponentModules = {};
ComponentModules[CatalogContentType.HouseDesign] = HouseDesign;
ComponentModules[CatalogContentType.GlobalSearchMaterial] = GlobalSearchMaterial;
ComponentModules[CatalogContentType.Hydropower] = Hydropower;
ComponentModules[CatalogContentType.CatalogModel] = CatalogModel;
ComponentModules[CatalogContentType.UserCollection] = UserCollection;
ComponentModules[CatalogContentType.UserUsed] = UserUsed;
ComponentModules[CatalogContentType.UserUploaded] = UserUploaded;

class CatalogAbstractFactory {
    constructor() {}

    static types = {};

    static registerModule(modulesObject: object) {
        for (let key in modulesObject) {
            CatalogAbstractFactory.types[key] = modulesObject[key];
        }
    }

    static getModule(type: string) {
        return CatalogAbstractFactory.types[type] 
            ? CatalogAbstractFactory.types[type] 
            : ComponentModules[CatalogContentType.HouseDesign] ;
    }
}

CatalogAbstractFactory.registerModule(ComponentModules);

export default CatalogAbstractFactory;