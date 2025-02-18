import { TestBed } from '@angular/core/testing';
import { AssigneePipe } from './assignee.pipe';
import { Assignee } from '../../interface';

describe('AssigneePipe', () => {
  let pipe: AssigneePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssigneePipe],
    });
    pipe = TestBed.inject(AssigneePipe);
  });

  it('should create an instance of the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform "Frontend-developer" to "Фронтенд-разработчик"', () => {
    const result = pipe.transform('Frontend-developer' as Assignee);
    expect(result).toBe('Фронтенд-разработчик');
  });

  it('should transform "Backend-developer" to "Бэкенд-разработчик"', () => {
    const result = pipe.transform('Backend-developer' as Assignee);
    expect(result).toBe('Бэкенд-разработчик');
  });

  it('should transform "QA-engineer" to "Тестировщик"', () => {
    const result = pipe.transform('QA-engineer' as Assignee);
    expect(result).toBe('Тестировщик');
  });

  it('should transform "Dev-ops" to "DevOps-инженер"', () => {
    const result = pipe.transform('Dev-ops' as Assignee);
    expect(result).toBe('DevOps-инженер');
  });

  it('should transform "Web-designer" to "Веб-дизайнер"', () => {
    const result = pipe.transform('Web-designer' as Assignee);
    expect(result).toBe('Веб-дизайнер');
  });

  it('should transform "System-analytic" to "Системный аналитик"', () => {
    const result = pipe.transform('System-analytic' as Assignee);
    expect(result).toBe('Системный аналитик');
  });

  it('should return "Неизвестный исполнитель" for unknown roles', () => {
    const result = pipe.transform('Unknown-role' as Assignee);
    expect(result).toBe('Неизвестный исполнитель');
  });
});
