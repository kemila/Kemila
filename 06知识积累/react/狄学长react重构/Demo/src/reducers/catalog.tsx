import { All } from '../actions/catalog';
import { Catalog } from '../entity/storeentity';
import * as Constants from '../constants/catalog';
import { CatalogContentType } from '../entity/catalogentity';

const initState = {
	catalogType: CatalogContentType.GlobalSearchMaterial,
	modelsData: [],
	pageRandom: 0,
	categoryId: '',
    isFetching: true,
	tenantOperator: 'Eq',
	secondCategories: [],
	thirdCategories: [],
	secondActiveId: '',
	thirdActiveId: '',
	secondActiveName: '',
	thirdActiveName: '',
};

export function changeCatalogType(state: Catalog = initState, action: All): Catalog {
	switch (action.type) {
		case Constants.CHANGE_CATALOG_TYPE:
			return {
				...state,
				catalogType: action.payLoad
			};
		case Constants.RESET_CATALOG_PAGEINDEX:
			return {
				...state,
				pageRandom: action.payLoad
			};
		case Constants.RECORD_SELECTED_CATEGORY_ID:
			return {
				...state,
				categoryId: action.payLoad
			}
		case Constants.CATALOG_MODELS_REQUEST:
			return {
				...state,
                isFetching: action.payLoad
			}
		case Constants.CATALOG_MODELS_RECEIVE:
			return {
				...state,
				modelsData: action.modelsData,
                isFetching: action.isFetching
			}
		case Constants.RECORD_CATALOG_SEARCH_CONDITIONS:
			return {
				...state,
				categoryId: action.categoryId,
				tenantOperator: action.tenantOperator
			}
		case Constants.RECORD_HEADER_SEARCH_CATEGORIES:
			return {
				...state,
				secondCategories: action.secondCategories,
				thirdCategories: action.thirdCategories,
				secondActiveId: action.secondActiveId,
				thirdActiveId: action.thirdActiveId,
				secondActiveName: action.secondActiveName,
				thirdActiveName: action.thirdActiveName
			}
		default:
			break;
	}

	return state;
}