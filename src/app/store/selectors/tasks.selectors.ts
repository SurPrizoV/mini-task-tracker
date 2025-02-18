import { createSelector, createFeatureSelector } from '@ngrx/store';

import { TaskState } from '../reducers/tasks.reducers';

/** Селектор для получения состояния задач из хранилища. */
export const selectTaskState = createFeatureSelector<TaskState>('tasks');

/** Селектор для получения списка всех задач. */
export const selectAllTasks = createSelector(
  selectTaskState,
  (state) => state.tasks
);

/** Селектор для отфильтрованных задач */
export const selectFilteredTasks = createSelector(
  selectTaskState,
  (state) => state.tasks
);

/** Селектор для получения состояния загрузки. */
export const selectLoading = createSelector(
  selectTaskState,
  (state) => state.loading
);

/** Селектор для получения ошибки, если она возникла. */
export const selectError = createSelector(
  selectTaskState,
  (state) => state.error
);
