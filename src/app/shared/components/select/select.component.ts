import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

/** Компонент выпадающего списка с поддержкой работы через ControlValueAccessor. */

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  /** Тайтл для выпадающего списка. */
  @Input() label: string = '';
  /** Массив вариантов для выбора. */
  @Input() options: { value: any; viewValue: string }[] = [];
  /** Флаг, разрешающий множественный выбор. */
  @Input() multiple: boolean = false;

  /** Выбранное значение. */
  protected value: any;
  /** Флаг доступности компонента (заблокирован/разблокирован). */
  protected disabled: boolean = false;

  /** Функция обратного вызова, вызываемая при изменении значения. */
  protected onChange: any = () => {};
  /** Функция обратного вызова, вызываемая при потере фокуса. */
  protected onTouched: any = () => {};

   /** Записывает новое значение в компонент. */
  writeValue(value: any): void {
    this.value = value;
  }

  /** Регистрирует функцию обратного вызова для обработки изменения значения. */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /** Регистрирует функцию обратного вызова для обработки потери фокуса. */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /** Устанавливает состояние доступности компонента. */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
