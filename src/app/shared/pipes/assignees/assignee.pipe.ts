import { Pipe, PipeTransform } from '@angular/core';
import { Assignee } from '../../interface';

/** Преобразует роль исполнителя в удобочитаемое название на русском языке. */

@Pipe({
  name: 'assignee',
  standalone: true,
})
export class AssigneePipe implements PipeTransform {
  transform(value: Assignee): string {
    switch (value) {
      case 'Frontend-developer':
        return 'Фронтенд-разработчик';
      case 'Backend-developer':
        return 'Бэкенд-разработчик';
      case 'QA-engineer':
        return 'Тестировщик';
      case 'Dev-ops':
        return 'DevOps-инженер';
      case 'Web-designer':
        return 'Веб-дизайнер';
      case 'System-analytic':
        return 'Системный аналитик';
      default:
        return 'Неизвестный исполнитель';
    }
  }
}
