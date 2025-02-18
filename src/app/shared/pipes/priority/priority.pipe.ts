import { Pipe, PipeTransform } from '@angular/core';
import { Priority } from '../../interface';


/** Преобразует приоритет в удобочитаемый на русском языке. */

@Pipe({
  name: 'priority',
  standalone: true,
})
export class PriorityPipe implements PipeTransform {
  transform(value: Priority): string {
    switch (value) {
      case 'low':
        return 'Низкий';
      case 'medium':
        return 'Средний';
      case 'high':
        return 'Высокий';
      default:
        return 'Неизвестный приоритет';
    }
  }
}
