import { Component } from '@angular/core';

import { SearchBoxComponent } from './shared/components/search-box/search-box.component';
import { TasksBoxComponent } from './shared/components/tasks-box/tasks-box.component';
import { FilterBoxComponent } from './shared/components/filter-box/filter-box.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SearchBoxComponent, TasksBoxComponent, FilterBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
