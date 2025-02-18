import { TestBed } from '@angular/core/testing';
import { StatusPipe } from './status.pipe';
import { Status } from '../../interface';

describe('StatusPipe', () => {
  let pipe: StatusPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatusPipe],
    });
    pipe = TestBed.inject(StatusPipe);
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "Открыта" for "open" status', () => {
    const result = pipe.transform('open' as Status);
    expect(result).toBe('Открыта');
  });

  it('should return "В процессе" for "in-progress" status', () => {
    const result = pipe.transform('in-progress' as Status);
    expect(result).toBe('В процессе');
  });

  it('should return "Завершена" for "completed" status', () => {
    const result = pipe.transform('completed' as Status);
    expect(result).toBe('Завершена');
  });

  it('should return "Отложена" for "deferred" status', () => {
    const result = pipe.transform('deferred' as Status);
    expect(result).toBe('Отложена');
  });

  it('should return "Неизвестный статус" for unknown status', () => {
    const result = pipe.transform('unknown' as Status);
    expect(result).toBe('Неизвестный статус');
  });
});
