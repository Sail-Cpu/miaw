import { combineReducers, configureStore } from "@reduxjs/toolkit";
//Reducer
import {AuthReducer} from "./auth/index.js";

const rootReducer = combineReducers({
    auth: AuthReducer
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: true
});

export default store;