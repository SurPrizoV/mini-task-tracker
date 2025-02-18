import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SelectComponent } from '../select/select.component';
import { Task } from '../../interface';
import { Store } from '@ngrx/store';
import { updateTask, deleteTask } from '../../../store/actions/tasks.actions';

@Component({
  selector: 'app-edit-task',
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
    MatDialogModule,
  ],
  templateUrl: './edit-task.component.html',
})
export class EditTaskComponent implements OnInit {
  /** Реактивная форма */
  protected taskForm!: FormGroup;
  /** Задача */
  protected task!: Task;
  /** Для хранения даты */
  protected today: Date = new Date();

  protected readonly priorities = [
    { value: 'low', viewValue: 'Низкий' },
    { value: 'medium', viewValue: 'Средний' },
    { value: 'high', viewValue: 'Высокий' },
  ];

  protected readonly statuses = [
    { value: 'open', viewValue: 'Открыта' },
    { value: 'in-progress', viewValue: 'В процессе' },
    { value: 'completed', viewValue: 'Завершена' },
    { value: 'deferred', viewValue: 'Отложена' },
  ];

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
    private readonly dialogRef: MatDialogRef<EditTaskComponent>,
    private readonly store: Store,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task }
  ) {
    this.task = data.task;
  }

  ngOnInit() {
    this.taskForm = this.fb.group({
      taskTitle: [this.task.title, Validators.required],
      taskDescription: [this.task.description],
      taskPriority: [this.task.priority, Validators.required],
      taskStatus: [this.task.status, Validators.required],
      taskAssignees: [this.task.assignees, Validators.required],
      taskDeadline: [this.task.deadline, Validators.required],
    });
  }

  /** Для редактирования задачи */
  protected updateTask() {
   const formValue = this.taskForm.value;

    const updatedTask: Task = {
      ...this.task,
      title: formValue.taskTitle,
      description: formValue.taskDescription,
      deadline: formValue.taskDeadline,
      priority: formValue.taskPriority,
      status: formValue.taskStatus,
      assignees: formValue.taskAssignees,
    };

    if (JSON.stringify(updatedTask) === JSON.stringify(this.task)) {
      this.dialogRef.close();
      return;
    }

    this.store.dispatch(updateTask({ task: updatedTask }));
    this.dialogRef.close(updatedTask);
  }

  /** Для удаления задачи */
  protected deleteTask() {
    this.store.dispatch(deleteTask({ id: this.task.id as string}));
    this.dialogRef.close();
  }
}
