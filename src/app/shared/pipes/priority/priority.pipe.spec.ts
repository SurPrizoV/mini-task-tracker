import { TestBed } from '@angular/core/testing';
import { PriorityPipe } from './priority.pipe';
import { Priority } from '../../interface';

describe('PriorityPipe', () => {
  let pipe: PriorityPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriorityPipe],
    });
    pipe = TestBed.inject(PriorityPipe);
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "Низкий" for "low" priority', () => {
    const result = pipe.transform('low' as Priority);
    expect(result).toBe('Низкий');
  });

  it('should return "Средний" for "medium" priority', () => {
    const result = pipe.transform('medium' as Priority);
    expect(result).toBe('Средний');
  });

  it('should return "Высокий" for "high" priority', () => {
    const result = pipe.transform('high' as Priority);
    expect(result).toBe('Высокий');
  });

  it('should return "Неизвестный приоритет" for unknown priority', () => {
    const result = pipe.transform('unknown' as Priority);
    expect(result).toBe('Неизвестный приоритет');
  });
});
