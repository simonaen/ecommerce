import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface LayoutState {
  sidebarCollapsed: boolean;
}

export const getLayoutState = createFeatureSelector('layout');

export const isSidebarCollapsed = createSelector(getLayoutState, (state: LayoutState) => {
  return state.sidebarCollapsed;
});
