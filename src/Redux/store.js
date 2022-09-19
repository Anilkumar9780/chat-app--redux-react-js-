// Redux Store
import { legacy_createStore } from 'redux';

import appReducer from './Reducer';

const configureStore = () => legacy_createStore(appReducer);
export default configureStore;
