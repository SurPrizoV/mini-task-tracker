import { Component, OnInit, Type } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { AssigneePipe } from '../../pipes/assignees/assignee.pipe';
import { PriorityPipe } from '../../pipes/priority/priority.pipe';


import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Task } from '../../interface';
import { ModalComponent } from '../modal/modal.component';
import { NewTaskComponent } from '../new-task/new-task.component';
import { loadTasks } from '../../../store/actions/tasks.actions';
import {
  selectAllTasks,
  selectError,
  selectLoading,
} from '../../../store/selectors/tasks.selectors';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { StatusPipe } from '../../pipes/status/status.pipe';

@Component({
  selector: 'app-tasks-box',
  standalone: true,
  imports: [
    DatePipe,
    AsyncPipe,
    AssigneePipe,
    PriorityPipe,
    StatusPipe,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './tasks-box.component.html',
  styleUrl: './tasks-box.component.scss',
})
export class TasksBoxComponent implements OnInit {
  /** Список всех задач */
  tasks$?: Observable<Task[]>;
  /** Селектор загрузки */
  loading$: Observable<boolean>;
  /** Для отображения ошибки */
  error$: Observable<unknown>;

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog
  ) {
    this.tasks$ = this.store.select(selectAllTasks);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    this.store.dispatch(loadTasks());
  }

  /** Для открытия модального окна создания новой задачи */
  openTaskDialog() {
    this.dialog.open(ModalComponent, {
      data: {
        title: 'Добавить новую задачу',
        component: NewTaskComponent as Type<any>,
      },
      width: '400px',
    });
  }

  /** Для открытия модального окна редактирования задачи */
  openEditTaskDialog(task: Task) {
    this.dialog.open(ModalComponent, {
      data: {
        title: 'Редактировать задачу',
        component: EditTaskComponent,
        task: task,
      },
      width: '400px',
    });
  }
}
