import catalogReducers from './catalogreducers';
import { combineReducers } from 'redux';

export default combineReducers({
    yamlState: catalogReducers,
});
