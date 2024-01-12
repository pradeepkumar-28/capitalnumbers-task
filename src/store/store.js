import { compose, createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { rootReducer } from "./Reducers/rootReducer";

const middleWares = [thunk];
const composedEnhancers = compose(applyMiddleware(...middleWares));
const Store = createStore(rootReducer, {}, composedEnhancers);

export default Store;
