import { createReducer, on } from '@ngrx/store';

import * as TaskActions from '../actions/tasks.actions';

import { Task } from '../../shared/interface';

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: unknown;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

/**
 * Редьюсер для задач, который обрабатывает изменения состояния в зависимости от действий.
 * Используется метод createReducer из @ngrx/store для определения, как обновляется состояние
 * в ответ на различные действия.
 *
 * @function taskReducer
 * @param {TaskState} state Текущее состояние хранилища задач
 * @param {Action} action Действие, которое изменяет состояние задач
 * @returns {TaskState} Новое состояние после обработки действия
 */
export const taskReducer = createReducer(
  initialState,

  /** Обработчик действия для загрузки задач. Устанавливает флаг загрузки в true. */
  on(TaskActions.loadTasks, (state) => ({ ...state, loading: true })),
  /** Обработчик успешной загрузки задач. Обновляет список задач и устанавливает флаг загрузки в false. */
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    loading: false,
  })),
  /** Обработчик ошибки при загрузке задач. Устанавливает флаг загрузки в false и добавляет ошибку. */
  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  /** Обработчик действия для добавления задачи. Устанавливает флаг загрузки в true. */
  on(TaskActions.addTask, (state) => ({ ...state, loading: true })),
  /** Обработчик успешного добавления новой задачи. Добавляет новую задачу в список и устанавливает флаг загрузки в false. */
  on(TaskActions.addTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
    loading: false,
  })),
  /** Обработчик ошибки при добавлении задачи. Устанавливает флаг загрузки в false и добавляет ошибку. */
  on(TaskActions.addTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  /** Обработчик действия для редактирования задачи. Устанавливает флаг загрузки в true. */
  on(TaskActions.updateTask, (state) => ({ ...state, loading: true })),
  /** Обработчик успешного обновления задачи. Устанавливает флаг загрузки в false и обновляет существующую задачу в списке. */
  on(TaskActions.updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    loading: false,
  })),
  /** Обработчик ошибки при редактировании задачи. Устанавливает флаг загрузки в false и добавляет ошибку. */
  on(TaskActions.updateTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  /** Обработчик действия для удаления задачи. Устанавливает флаг загрузки в true. */
  on(TaskActions.deleteTask, (state) => ({ ...state, loading: true })),
  /** Обработчик успешного удаления задачи. Удаляет задачу из списка по ID. */
  on(TaskActions.deleteTaskSuccess, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter((t) => t.id !== id),
    loading: false,
  })),
  /** Обработчик ошибки при удалении задачи. Устанавливает флаг загрузки в false и добавляет ошибку. */
  on(TaskActions.deleteTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(TaskActions.loadFilteredTasks, (state) => ({ ...state, loading: true })),
    /** Обработчик успешно отфильтрованных задач. Обновляет список задач и устанавливает флаг загрузки в false. */
    on(TaskActions.loadFilteredTasksSuccess, (state, { tasks }) => ({
      ...state,
      tasks: tasks,
      loading: false,
    })),
    /** Обработчик ошибки при фильтрации задач. Устанавливает флаг загрузки в false и добавляет ошибку. */
    on(TaskActions.loadFilteredTasksFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }))
);
