import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { AppEffects } from './app.effects';
import * as TaskActions from './store/actions/tasks.actions';
import { Task } from './shared/interface';
import { LINK } from '../.env/FB_Links';

describe('AppEffects', () => {
  let actions$: Observable<any>;
  let effects: AppEffects;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppEffects,
        provideMockActions(() => actions$),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    effects = TestBed.inject(AppEffects);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should dispatch loadTasksSuccess on successful task load', (done) => {
    const mockTasks: { [key: string]: Task } = {
      '1': {
        id: '1',
        title: 'Task 1',
        assignees: [],
        priority: 'low',
        status: 'open',
        deadline: new Date(),
      },
      '2': {
        id: '2',
        title: 'Task 2',
        assignees: [],
        priority: 'high',
        status: 'in-progress',
        deadline: new Date(),
      },
    };

    actions$ = of(TaskActions.loadTasks());

    effects.loadTasks$.subscribe((result) => {
      expect(result).toEqual(
        TaskActions.loadTasksSuccess({
          tasks: [
            {
              id: '1',
              title: 'Task 1',
              assignees: [],
              priority: 'low',
              status: 'open',
              deadline: new Date(),
            },
            {
              id: '2',
              title: 'Task 2',
              assignees: [],
              priority: 'high',
              status: 'in-progress',
              deadline: new Date(),
            },
          ],
        })
      );
      done();
    });

    httpMock.expectOne(`${LINK.BASE_URL}/tasks.json`).flush(mockTasks);
  });

  it('should dispatch loadTasksFailure on task load error', (done) => {
    const errorMessage = 'Failed to load tasks';

    actions$ = of(TaskActions.loadTasks());

    effects.loadTasks$.subscribe((result) => {
      expect(result).toEqual(
        TaskActions.loadTasksFailure({
          error: jasmine.any(Object),
        })
      );
      done();
    });

    httpMock
      .expectOne(`${LINK.BASE_URL}/tasks.json`)
      .error(new ErrorEvent('Network error'), { statusText: errorMessage });
  });

  it('should dispatch addTaskSuccess on successful task addition', (done) => {
    const newTask: Task = {
      id: '',
      title: 'New Task',
      assignees: [],
      priority: 'low',
      status: 'open',
      deadline: new Date(),
    };
    const response = { name: '123' };

    actions$ = of(TaskActions.addTask({ task: newTask }));

    effects.addTask$.subscribe((result) => {
      expect(result).toEqual(
        TaskActions.addTaskSuccess({ task: { ...newTask, id: '123' } })
      );
      done();
    });

    httpMock.expectOne(`${LINK.BASE_URL}/tasks.json`).flush(response);
  });

  it('should dispatch addTaskFailure on task addition error', (done) => {
    const newTask: Task = {
      id: '',
      title: 'New Task',
      assignees: [],
      priority: 'low',
      status: 'open',
      deadline: new Date(),
    };

    actions$ = of(TaskActions.addTask({ task: newTask }));

    effects.addTask$.subscribe((result) => {
      expect(result).toEqual(
        TaskActions.addTaskFailure({
          error: jasmine.any(Object),
        })
      );
      done();
    });

    httpMock
      .expectOne(`${LINK.BASE_URL}/tasks.json`)
      .error(new ErrorEvent('Network error'), {
        statusText: 'Failed to add task',
      });
  });

  it('should dispatch updateTaskSuccess on successful task update', (done) => {
    const updatedTask: Task = {
      id: '1',
      title: 'Updated Task',
      assignees: [],
      priority: 'low',
      status: 'open',
      deadline: new Date(),
    };

    actions$ = of(TaskActions.updateTask({ task: updatedTask }));

    effects.updateTask$.subscribe((result) => {
      expect(result).toEqual(
        TaskActions.updateTaskSuccess({ task: updatedTask })
      );
      done();
    });

    httpMock.expectOne(`${LINK.BASE_URL}/tasks/1.json`).flush(updatedTask);
  });

  it('should dispatch updateTaskFailure on task update error', (done) => {
    const updatedTask: Task = {
      id: '1',
      title: 'Updated Task',
      assignees: [],
      priority: 'low',
      status: 'open',
      deadline: new Date(),
    };
    const errorMessage = 'Failed to update task';

    actions$ = of(TaskActions.updateTask({ task: updatedTask }));

    effects.updateTask$.subscribe((result) => {
      expect(result).toEqual(
        TaskActions.updateTaskFailure({
          error: jasmine.any(Object),
        })
      );
      done();
    });

    httpMock
      .expectOne(`${LINK.BASE_URL}/tasks/1.json`)
      .error(new ErrorEvent('Network error', { message: errorMessage }));
  });

  it('should dispatch deleteTaskSuccess on successful task deletion', (done) => {
    const taskId = '1';

    actions$ = of(TaskActions.deleteTask({ id: taskId }));

    effects.deleteTask$.subscribe((result) => {
      expect(result).toEqual(TaskActions.deleteTaskSuccess({ id: taskId }));
      done();
    });

    httpMock.expectOne(`${LINK.BASE_URL}/tasks/1.json`).flush({});
  });

  it('should dispatch deleteTaskFailure on task deletion error', (done) => {
    const taskId = '1';
    const errorMessage = 'Failed to delete task';

    actions$ = of(TaskActions.deleteTask({ id: taskId }));

    effects.deleteTask$.subscribe((result) => {
      expect(result).toEqual(
        TaskActions.deleteTaskFailure({
          error: jasmine.any(Object),
        })
      );
      done();
    });

    httpMock
      .expectOne(`${LINK.BASE_URL}/tasks/1.json`)
      .error(new ErrorEvent('Network error'), { statusText: errorMessage });
  });

  it('should dispatch loadFilteredTasksSuccess when filtering by assignees', (done) => {
    const mockTasks: { [key: string]: Task } = {
      '1': {
        id: '1',
        title: 'Task 1',
        assignees: ['Backend-developer'],
        priority: 'high',
        status: 'in-progress',
        deadline: new Date(),
      },
      '2': {
        id: '2',
        title: 'Task 2',
        assignees: [],
        priority: 'low',
        status: 'open',
        deadline: new Date(),
      },
    };

    const filter = { field: 'assignees', value: 'Backend-developer' };

    actions$ = of(TaskActions.loadFilteredTasks({ filter }));

    effects.loadFilteredTasks$.subscribe((result) => {
      expect(result).toEqual(
        TaskActions.loadFilteredTasksSuccess({
          tasks: [
            {
              id: '1',
              title: 'Task 1',
              assignees: ['Backend-developer'],
              priority: 'high',
              status: 'in-progress',
              deadline: new Date(),
            },
          ],
        })
      );
      done();
    });

    httpMock.expectOne(`${LINK.BASE_URL}/tasks.json`).flush(mockTasks);
  });

  it('should dispatch loadFilteredTasksSuccess when filtering by title', (done) => {
    const mockTasks: { [key: string]: Task } = {
      '1': {
        id: '1',
        title: 'important',
        assignees: [],
        priority: 'low',
        status: 'open',
        deadline: new Date(),
      },
      '2': {
        id: '2',
        title: 'important two',
        assignees: [],
        priority: 'high',
        status: 'in-progress',
        deadline: new Date(),
      },
    };

    const filter = { field: 'title', value: 'important' };

    actions$ = of(TaskActions.loadFilteredTasks({ filter }));

    effects.loadFilteredTasks$.subscribe((result) => {
      expect(result).toEqual(
        TaskActions.loadFilteredTasksSuccess({
          tasks: [
            {
              id: '1',
              title: 'important',
              assignees: [],
              priority: 'low',
              status: 'open',
              deadline: new Date(),
            },
            {
              id: '2',
              title: 'important two',
              assignees: [],
              priority: 'high',
              status: 'in-progress',
              deadline: new Date(),
            },
          ],
        })
      );
      done();
    });

    httpMock.expectOne(`${LINK.BASE_URL}/tasks.json`).flush(mockTasks);
  });

  it('should dispatch loadFilteredTasksSuccess when filtering by another field', (done) => {
    const mockTasks: { [key: string]: Task } = {
      '1': {
        id: '1',
        title: 'Task 1',
        assignees: [],
        priority: 'low',
        status: 'open',
        deadline: new Date(),
      },
      '2': {
        id: '2',
        title: 'Task 2',
        assignees: [],
        priority: 'high',
        status: 'in-progress',
        deadline: new Date(),
      },
    };

    const filter = { field: 'status', value: 'completed' };
    const queryParams = new URLSearchParams({
      orderBy: JSON.stringify(filter.field),
      equalTo: JSON.stringify(filter.value),
    }).toString();
    actions$ = of(TaskActions.loadFilteredTasks({ filter }));

    effects.loadFilteredTasks$.subscribe((result) => {
      expect(result).toEqual(
        TaskActions.loadFilteredTasksSuccess({
          tasks: [
            {
              id: '1',
              title: 'Task 1',
              assignees: [],
              priority: 'low',
              status: 'open',
              deadline: new Date(),
            },
          ],
        })
      );
      done();
    });

    httpMock.expectOne(`${LINK.BASE_URL}/tasks.json?${queryParams}`).flush({
      '1': {
        id: '1',
        title: 'Task 1',
        assignees: [],
        priority: 'low',
        status: 'open',
        deadline: new Date(),
      },
    });
  });

  it('should dispatch loadFilteredTasksFailure on filtering error', (done) => {
    const filter = { field: 'status', value: 'completed' };
    const queryParams = new URLSearchParams({
      orderBy: JSON.stringify(filter.field),
      equalTo: JSON.stringify(filter.value),
    }).toString();
    const errorMessage = 'Failed to filter tasks';

    actions$ = of(TaskActions.loadFilteredTasks({ filter }));

    effects.loadFilteredTasks$.subscribe((result) => {
      expect(result).toEqual(
        TaskActions.loadFilteredTasksFailure({
          error: jasmine.any(Object),
        })
      );
      done();
    });

    httpMock
      .expectOne(`${LINK.BASE_URL}/tasks.json?${queryParams}`)
      .error(new ErrorEvent('Network error'), { statusText: errorMessage });
  });
});
