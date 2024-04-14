import {createSelector} from "@reduxjs/toolkit";

const appSelect = (state) => state.app;
export const appSelector = createSelector([appSelect], (app) => app.actualApp.data);
export const allAppsSelector = createSelector([appSelect], (app) => app.allApps);
export const allAppsNoCatSelector = createSelector([appSelect], (app) => {
    let res = [];
    for(let i = 0; i < app.allApps.length; i++){
        for(let j = 0; j < app.allApps[i].apps.length; j++){
            res.push(app.allApps[i].apps[j]);
        }
    }
    return res;
});
export const appShortcutsSelector = (chapter_id) => createSelector([appSelect], (app) => {
    const chapter = app.actualApp.chapters.find(chapter => chapter.chapter_id === chapter_id);
    if (chapter) {
        return chapter;
    } else {
        return {shortcuts: []}
    }
});