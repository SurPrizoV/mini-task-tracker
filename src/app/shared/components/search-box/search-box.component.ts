import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { loadFilteredTasks } from '../../../store/actions/tasks.actions';

@Component({
  selector: 'app-search-box',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss',
})
export class SearchBoxComponent {
  /** Строка для поиска */
  protected searchControl = new FormControl('');

  constructor(private readonly store: Store) {
    this.searchControl.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((query) => {
        this.store.dispatch(
          loadFilteredTasks({
            filter: { field: 'title', value: query || '' },
          })
        );
      });
  }
}
