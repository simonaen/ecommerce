import {Action, createReducer, on} from '@ngrx/store';
import {LayoutState} from './index';
import {LayoutActions} from "./layout.actions";

export const initialState: LayoutState = {
  sidebarCollapsed: false,
  gender: null
};

const _reducer = createReducer(
  initialState,
  on(LayoutActions.collapseSidebar, state => ({...state, sidebarCollapsed: true})),
  on(LayoutActions.expandSidebar, state => ({...state, sidebarCollapsed: false})),
  on(LayoutActions.setGender, (state, action) => ({...state, gender: action.gender}))
);

export function reducer(state: LayoutState, action: Action): LayoutState {
  return _reducer(state, action);
}
