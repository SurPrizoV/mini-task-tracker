import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { SelectComponent } from '../select/select.component';
import { Assignee, Priority, Status, Task } from '../../interface';
import { Store } from '@ngrx/store';
import { addTask } from '../../../store/actions/tasks.actions';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SelectComponent,
  ],
  templateUrl: './new-task.component.html',
})
export class NewTaskComponent implements OnInit {
  /** Реактивная форма */
  protected taskForm!: FormGroup;
  /** Название задачи */
  protected taskTitle = '';
  /** Описание задачи (опционально) */
  protected taskDescription = '';
  /** Выбранный приооритет */
  protected taskPriority!: Priority;
  /** Выбранный статус */
  protected taskStatus!: Status;
  /** Выбранные исполнители */
  protected taskAssignees: Assignee[] = [];
  /** Для хранения даты */
  protected today: Date = new Date();

  /** Значения селекта приоритета */
  protected readonly priorities = [
    { value: 'low', viewValue: 'Низкий' },
    { value: 'medium', viewValue: 'Средний' },
    { value: 'high', viewValue: 'Высокий' },
  ];

  /** Значения селекта статуса */
  protected readonly statuses = [
    { value: 'open', viewValue: 'Открыта' },
    { value: 'in-progress', viewValue: 'В процессе' },
    { value: 'completed', viewValue: 'Завершена' },
    { value: 'deferred', viewValue: 'Отложена' },
  ];

  /** Значения селекта исполнителей */
  protected readonly assignees = [
    { value: 'Frontend-developer', viewValue: 'Frontend-разработчик' },
    { value: 'Backend-developer', viewValue: 'Backend-разработчик' },
    { value: 'QA-engineer', viewValue: 'QA-инженер' },
    { value: 'Dev-ops', viewValue: 'DevOps' },
    { value: 'Web-designer', viewValue: 'Web дизайнер' },
    { value: 'System-analytic', viewValue: 'Системный аналитик' },
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<NewTaskComponent>,
    private readonly store: Store
  ) {}

  ngOnInit() {
    this.taskForm = this.fb.group({
      taskTitle: ['', Validators.required],
      taskDescription: [''],
      taskPriority: ['', Validators.required],
      taskStatus: ['', Validators.required],
      taskAssignees: [[], Validators.required],
      taskDeadline: [null, Validators.required],
    });
  }

  /** Для добавления задачи */
  protected addTask() {
    if (this.taskForm.invalid) {
      return;
    }

    const formValue = this.taskForm.value;

    const newTask: Task = {
      title: formValue.taskTitle,
      description: formValue.taskDescription,
      deadline: formValue.taskDeadline,
      priority: formValue.taskPriority,
      status: formValue.taskStatus,
      assignees: formValue.taskAssignees,
    };

    this.store.dispatch(addTask({ task: newTask }));
    this.dialogRef.close(newTask);
    this.taskForm.reset();
  }
}
