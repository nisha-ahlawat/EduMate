import { legacy_createStore as createStore } from "redux";
import { reducers } from "./reducers";

const devTools =
  typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined;

const mystore = createStore(reducers, devTools);

export default mystore;
