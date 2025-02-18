import {
  Component,
  Inject,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

/**
 * Компонент модального окна.
 * Позволяет отображать заголовок и динамически загружать другие компоненты.
 */

@Component({
  selector: 'app-modal',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <ng-container #content></ng-container>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="closeDialog()">Закрыть</button>
    </mat-dialog-actions>
  `,
})
export class ModalComponent implements OnInit {
  /**
   * Контейнер для динамически загружаемого компонента.
   */
  @ViewChild('content', { read: ViewContainerRef, static: true })
  contentRef!: ViewContainerRef;

  /**
   * Создаёт экземпляр `ModalComponent`.
   * @param {MatDialogRef<ModalComponent>} dialogRef Ссылка на текущее модальное окно.
   * @param {{ title: string; component: Type<any> }} data Данные, переданные в модальное окно.
   */
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; component: Type<any> }
  ) {}

  ngOnInit() {
    if (this.data.component) {
      this.contentRef.clear();
      this.contentRef.createComponent(this.data.component);
    }
  }

  /** Для закрытия модального окна */
  protected closeDialog() {
    this.dialogRef.close();
  }
}
