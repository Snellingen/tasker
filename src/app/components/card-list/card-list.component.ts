import { Task } from '../../services/task.service';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { ViewChild, ElementRef } from '@angular/core';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [
    TaskCardComponent, 
    ScrollingModule,
    CdkDropList,
    CdkDrag
  ],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CardListComponent {

  @Input() dataSource: Task[] | null = [];
  @Input() disableDrag: boolean | null = false;
  @Input() loading: boolean | null = false;
  @ViewChild('wrapper', { static: true }) wrapper!: ElementRef;
  @ViewChild('viewport', { static: false }) viewport!: CdkVirtualScrollViewport;

  itemPixelSize = 62;
  minBufferPx = 2 * this.itemPixelSize;
  maxBufferPx = 2 * this.itemPixelSize;
  lastDragIndex: number = -1;
  idKey = 'task_';

  dragStarted(event: any) {
  }

  onItemDrop(event: any) {
    if (this.dataSource === null) return;
    if (this.viewport === null) return;
    const vsStartIndex = this.viewport.getRenderedRange().start;
    moveItemInArray(this.dataSource, event.previousIndex + vsStartIndex, event.currentIndex + vsStartIndex);
    this.dataSource = [...this.dataSource];
  }

}
