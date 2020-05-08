import {createAction, props} from '@ngrx/store';
import {Gender} from "../../core/models/gender.enum";

const expandSidebar = createAction('[Layout] Expand sidebar');

const collapseSidebar = createAction('[Layout] Collapse Sidebar');

const setGender = createAction('[Layout] Set gender', props<{ gender: Gender }>());

export const LayoutActions = {
  expandSidebar,
  collapseSidebar,
  setGender
}
