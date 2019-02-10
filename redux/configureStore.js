import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { teachers } from './teachers';
import { comments } from './comments';
import { promotions } from './promotions';
import { onlineClasses } from './onlineClasses';
import { favorites } from './favorites';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';


export const ConfigureStore = () => {

    const config = {
        key: 'root',
        storage,
        debug: true
    }
    const store = createStore(
        persistCombineReducers(config, {
            teachers,
            comments,
            onlineClasses,
            favorites
        }),
        applyMiddleware(thunk, logger)
    );

    const persistor = persistStore(store)

    return { persistor, store };
}