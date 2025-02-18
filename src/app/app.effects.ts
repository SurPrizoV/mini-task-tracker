import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

import { catchError, map, mergeMap, of } from 'rxjs';

import * as TaskActions from './store/actions/tasks.actions';

import { LINK } from '../.env/FB_Links';
import { Assignee, Task } from './shared/interface';

/**
 * Класс который обрабатывает side-эффекты, такие как HTTP-запросы, и диспатчит соответствующие действия.
 */

@Injectable()
export class AppEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  /** Эффект для загрузки задач. */
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(() =>
        this.http
          .get<{ [key: string]: Task }>(`${LINK.BASE_URL}/tasks.json`)
          .pipe(
            map((response) => {
              const tasks = Object.keys(response).map((key) => ({
                id: key,
                ...response[key],
              }));
              return TaskActions.loadTasksSuccess({ tasks });
            }),
            catchError((error) => of(TaskActions.loadTasksFailure({ error })))
          )
      )
    )
  );

  /** Эффект для добавления новой задачи. */
  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.addTask),
      mergeMap(({ task }) =>
        this.http
          .post<{ name: string }>(`${LINK.BASE_URL}/tasks.json`, task)
          .pipe(
            map((response) =>
              TaskActions.addTaskSuccess({
                task: { ...task, id: response.name },
              })
            ),
            catchError((error) => of(TaskActions.addTaskFailure({ error })))
          )
      )
    )
  );

  /** Эффект для обновления существующей задачи. */
  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTask),
      mergeMap(({ task }) =>
        this.http
          .patch<Task>(`${LINK.BASE_URL}/tasks/${task.id}.json`, task)
          .pipe(
            map(() => TaskActions.updateTaskSuccess({ task })),
            catchError((error) => of(TaskActions.updateTaskFailure({ error })))
          )
      )
    )
  );

  /** Эффект для удаления задачи. */
  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      mergeMap(({ id }) =>
        this.http.delete(`${LINK.BASE_URL}/tasks/${id}.json`).pipe(
          map(() => TaskActions.deleteTaskSuccess({ id })),
          catchError((error) => of(TaskActions.deleteTaskFailure({ error })))
        )
      )
    )
  );

  /** Эффект для фильтрации задач. */
  loadFilteredTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadFilteredTasks),
      mergeMap(({ filter }) => {
        if (filter.field === 'assignees') {
          return this.http
            .get<{ [key: string]: Task }>(`${LINK.BASE_URL}/tasks.json`)
            .pipe(
              map((response) => {
                const tasks = Object.keys(response).map((key) => ({
                  id: key,
                  ...response[key],
                }));
                const filteredTasks = tasks.filter((task) =>
                  task.assignees.includes(filter.value as Assignee)
                );
                return TaskActions.loadFilteredTasksSuccess({
                  tasks: filteredTasks,
                });
              }),
              catchError((error) =>
                of(TaskActions.loadFilteredTasksFailure({ error }))
              )
            );
        } else if (filter.field === 'title') {
          return this.http
            .get<{ [key: string]: Task }>(`${LINK.BASE_URL}/tasks.json`)
            .pipe(
              map((response) => {
                const tasks = Object.keys(response).map((key) => ({
                  id: key,
                  ...response[key],
                }));
                const filteredTasks = tasks.filter((task) =>
                  task.title.toLowerCase().includes((filter.value as string).toLowerCase())
                );
                return TaskActions.loadFilteredTasksSuccess({
                  tasks: filteredTasks,
                });
              }),
              catchError((error) =>
                of(TaskActions.loadFilteredTasksFailure({ error }))
              )
            );
        } else {
          const queryParams = new URLSearchParams({
            orderBy: JSON.stringify(filter.field),
            equalTo: JSON.stringify(filter.value),
          }).toString();
          const url = `${LINK.BASE_URL}/tasks.json?${queryParams}`;
          return this.http.get<{ [key: string]: Task }>(url).pipe(
            map((response) => {
              const tasks = Object.keys(response).map((key) => ({
                id: key,
                ...response[key],
              }));
              return TaskActions.loadFilteredTasksSuccess({ tasks });
            }),
            catchError((error) =>
              of(TaskActions.loadFilteredTasksFailure({ error }))
            )
          );
        }
      })
    )
  );
}
