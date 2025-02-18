import { createAction, props } from '@ngrx/store';

import { Task } from '../../shared/interface';

/** Загрузка всех задач */
export const loadTasks = createAction('[Tasks] Load tasks');
/** Действие, которое вызывается при успешной загрузке задач. */
export const loadTasksSuccess = createAction(
  '[Tasks] Load tasks success',
  props<{ tasks: Task[] }>()
);
/** Действие, которое вызывается при ошибке загрузки задач. */
export const loadTasksFailure = createAction(
  '[Tasks] Load tasks failure',
  props<{ error: unknown }>()
);

/** Добавление задачи */
export const addTask = createAction(
  '[Tasks] Add Task',
  props<{ task: Task }>()
);
/** Действие, которое вызывается при успешном добавлении задачи. */
export const addTaskSuccess = createAction(
  '[Tasks] Add Task Success',
  props<{ task: Task }>()
);
/** Действие, которое вызывается при ошибке добавления задачи. */
export const addTaskFailure = createAction(
  '[Tasks] Add Task Failure',
  props<{ error: any }>()
);

/** Обновление задачи */
export const updateTask = createAction(
  '[Tasks] Update Task',
  props<{ task: Task }>()
);
/** Действие, которое вызывается при успешном обновлении задачи. */
export const updateTaskSuccess = createAction(
  '[Tasks] Update Task Success',
  props<{ task: Task }>()
);
/** Действие, которое вызывается при ошибке обновления задачи. */
export const updateTaskFailure = createAction(
  '[Tasks] Update Task Failure',
  props<{ error: any }>()
);

/** Удаление задачи */
export const deleteTask = createAction(
  '[Tasks] Delete Task',
  props<{ id: string }>()
);
/** Действие, которое вызывается при успешном удалении задачи. */
export const deleteTaskSuccess = createAction(
  '[Tasks] Delete Task Success',
  props<{ id: string }>()
);
/** Действие, которое вызывается при ошибке удаления задачи. */
export const deleteTaskFailure = createAction(
  '[Tasks] Delete Task Failure',
  props<{ error: any }>()
);

/** Загрузка задач с фильтрацией */
export const loadFilteredTasks = createAction(
  '[Tasks] Load Filtered Tasks',
  props<{ filter: { field: string; value: string | Date } }>()
);

/** Действие при успешной загрузке отфильтрованных задач */
export const loadFilteredTasksSuccess = createAction(
  '[Tasks] Load Filtered Tasks Success',
  props<{ tasks: Task[] }>()
);

/** Действие при ошибке загрузки отфильтрованных задач */
export const loadFilteredTasksFailure = createAction(
  '[Tasks] Load Filtered Tasks Failure',
  props<{ error: any }>()
);
