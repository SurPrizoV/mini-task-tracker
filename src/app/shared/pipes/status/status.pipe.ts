import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../../interface';

/** Преобразует статус в удобочитаемый на русском языке. */

@Pipe({
  name: 'status',
  standalone: true,
})
export class StatusPipe implements PipeTransform {
  transform(value: Status): string {
    switch (value) {
      case 'open':
        return 'Открыта';
      case 'in-progress':
        return 'В процессе';
      case 'completed':
        return 'Завершена';
      case 'deferred':
        return 'Отложена';
      default:
        return 'Неизвестный статус';
    }
  }
}
