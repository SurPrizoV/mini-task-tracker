import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { Store } from '@ngrx/store';
import {
  loadFilteredTasks,
  loadTasks,
} from '../../../store/actions/tasks.actions';

@Component({
  selector: 'app-filter-box',
  imports: [
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './filter-box.component.html',
  styleUrl: './filter-box.component.scss',
})
export class FilterBoxComponent {
  /** Выбранный приоритет */
  protected selectedPriority?: string;
  /** Выбранный статус */
  protected selectedStatus?: string;
  /** Выбранный исполнитель */
  protected selectedAssignee?: string;
  /** Выбранная дата для дедлайна */
  protected deadlineDate: Date | null = null;

  /** Опции приоритетов */
  protected readonly priorityOptions = [
    { value: 'low', viewValue: 'Низкий' },
    { value: 'medium', viewValue: 'Средний' },
    { value: 'high', viewValue: 'Высокий' },
  ];

  /** Опции статусов */
  protected readonly statusOptions = [
    { value: 'open', viewValue: 'Открыт' },
    { value: 'in-progress', viewValue: 'В процессе' },
    { value: 'completed', viewValue: 'Завершен' },
    { value: 'deferred', viewValue: 'Отложен' },
  ];

  /** Опции исполнителей */
  protected readonly assigneeOptions = [
    { value: 'Frontend-developer', viewValue: 'Frontend разработчик' },
    { value: 'Backend-developer', viewValue: 'Backend разработчик' },
    { value: 'QA-engineer', viewValue: 'QA Engineer' },
    { value: 'Dev-ops', viewValue: 'Dev Ops' },
    { value: 'Web-designer', viewValue: 'Web дизайнер' },
    { value: 'System-analytic', viewValue: 'Системный аналитик' },
  ];

  constructor(private readonly store: Store) {}

  /** Функция для применения фильтра */
  protected applyFilter(changedFilter: string) {
    if (changedFilter !== 'priority') this.selectedPriority = undefined;
    if (changedFilter !== 'status') this.selectedStatus = undefined;
    if (changedFilter !== 'assignee') this.selectedAssignee = undefined;
    if (changedFilter !== 'deadline') this.deadlineDate = null;

    let filter = null;
    if (this.selectedPriority) {
      filter = { field: 'priority', value: this.selectedPriority };
    } else if (this.selectedStatus) {
      filter = { field: 'status', value: this.selectedStatus };
    } else if (this.selectedAssignee) {
      filter = { field: 'assignees', value: this.selectedAssignee };
    } else if (this.deadlineDate) {
      filter = { field: 'deadline', value: this.deadlineDate.toISOString() };
    }

    if (filter) {
      this.store.dispatch(loadFilteredTasks({ filter }));
    }
  }

  /** Для сброса всех филтров */
  protected clearFilters() {
    (this.selectedPriority = undefined),
      (this.selectedStatus = undefined),
      (this.selectedAssignee = undefined),
      (this.deadlineDate = null);
    this.store.dispatch(loadTasks());
  }
}
