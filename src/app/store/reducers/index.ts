import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { taskReducer, TaskState } from './tasks.reducers';

export interface State {
  tasks: TaskState;
}

export const reducers: ActionReducerMap<State> = {
  tasks: taskReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
