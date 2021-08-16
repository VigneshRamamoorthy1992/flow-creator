import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { PageFlowJsonReducer } from "./PageFlowJson/reducers";

const rootReducer = combineReducers({
    fageFlowJson: PageFlowJsonReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore(initalState?: any) {
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);
    let store;
    if (!!initalState) {
        store = createStore(
            rootReducer,
            initalState,
            composeWithDevTools(middleWareEnhancer)
        );
    } else {
        store = createStore(
            rootReducer,
            composeWithDevTools(middleWareEnhancer)
        );
    }

    return store;
}