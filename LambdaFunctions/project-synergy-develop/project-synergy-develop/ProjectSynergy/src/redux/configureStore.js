import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

export default function configureStore(initialState = { user: 'Alex'}) {
    return createStore(
        rootReducer,
        initialState
    )
}