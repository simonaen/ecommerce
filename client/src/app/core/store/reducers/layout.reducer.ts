import * as Actions from '../actions/layout.actions';
import {Action, createReducer, on} from '@ngrx/store';
import {LayoutState} from '../state/layout.state';

export const initialState: LayoutState = {
  sidebarCollapsed: false
};

const sidebarReducer = createReducer(
  initialState,
  on(Actions.collapseSidebar, state => ({...state, sidebarCollapsed: true})),
  on(Actions.expandSidebar, state => ({...state, sidebarCollapsed: false}))
);

export function reducer(state: LayoutState, action: Action): LayoutState {
  return sidebarReducer(state, action);
}
