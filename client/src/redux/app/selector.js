import {createSelector} from "@reduxjs/toolkit";

const appSelect = (state) => state.app;
export const appSelector = createSelector([appSelect], (app) => app.actualApp.data);
export const allAppsSelector = createSelector([appSelect], (app) => app.allApps);
export const AppShortcutsSelector = createSelector([appSelect], (app) =>
    app.actualApp.chapters.find(chapter => chapter.chapter_id === 1)
);



