import {createSelector} from "@reduxjs/toolkit";

const authSelect = (state) => state.auth;

export const currentUserSelector = createSelector([authSelect], (auth) => auth.user);

export const isLoggedInSelector = createSelector([authSelect], (auth) => auth.isLoggedIn);