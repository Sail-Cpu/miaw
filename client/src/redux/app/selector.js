import {createSelector} from "@reduxjs/toolkit";

const appSelect = (state) => state.app;
export const appSelector = createSelector([appSelect], (app) => app.actualApp.data);
export const appChaptersSelector = createSelector([appSelect], (app) => app.actualApp.chapters)
export const allAppsSelector = createSelector([appSelect], (app) => app.allApps);
export const userAppsSelector = createSelector([appSelect], (app) => app.userApps);
export const allAppsNoCatSelector = createSelector([appSelect], (app) => {
    let res = [];
    for(let i = 0; i < app.allApps.length; i++){
        for(let j = 0; j < app.allApps[i].apps.length; j++){
            res.push(app.allApps[i].apps[j]);
        }
    }
    return res;
});
export const appShortcutsByChapterSelector = (chapter_id) => createSelector([appChaptersSelector], (app) => {
    const chapter = app.find(chapter => chapter.chapter_id === chapter_id);
    if (chapter) {
        return chapter;
    } else {
        return {shortcuts: []}
    }
});

export const appShortcutsSelector = () => createSelector([appChaptersSelector], (app) => {
    const apps = []
    for(let i = 0; i < app.length; i++){
        for(let j = 0; j < app[i].shortcuts.length; j++){
            apps.push(app[i].shortcuts[j]);
        }
    }
    return apps;
});