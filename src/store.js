import { applyMiddleware,createStore } from "redux";
import {thunk} from "redux-thunk"
import { inventoryReducer } from "./reducer";

export const store = createStore(inventoryReducer, applyMiddleware(thunk))