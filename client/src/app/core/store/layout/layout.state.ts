import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Gender} from "@core/models/gender.enum";

export interface LayoutState {
  sidebarCollapsed: boolean;
  gender: Gender;
}

export const getLayoutState = createFeatureSelector('layout');

export const isSidebarCollapsed = createSelector(getLayoutState, (state: LayoutState) => {
  return state.sidebarCollapsed;
});

export const gender = createSelector(getLayoutState, (state: LayoutState) => {
  return state.gender;
});
