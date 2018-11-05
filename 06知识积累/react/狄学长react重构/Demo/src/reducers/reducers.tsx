import { combineReducers } from 'redux';
import { changeCatalogType} from './catalog';

const rootReducer = combineReducers({
	catalog: changeCatalogType,
});

export default rootReducer;