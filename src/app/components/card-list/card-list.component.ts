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
  @ViewChild('wrapper', { static: true }) wrapper!: ElementRef;
  @ViewChild('viewport', { static: true }) viewport!: CdkVirtualScrollViewport;

  itemPixelSize = 62;
  minBufferPx = 2 * this.itemPixelSize;
  maxBufferPx = 2 * this.itemPixelSize;

  lastDragIndex: number = -1;
  idKey = 'task_';

  getDragItemIndex(id: string): number {
    return Number(id.substring(this.idKey.length));
  }

  getDragItemId(index: number): string {
    return this.idKey + index;
  }

  dragStarted(event: any) {
    console.log('Drag started:', event);
    this.lastDragIndex = this.getDragItemIndex(event.source.element.nativeElement.id);
  }

  onItemDrop(event: any) {
    if (this.dataSource === null) return;
    const vsStartIndex = this.viewport.getRenderedRange().start;
    console.log('Item dropped:', event, vsStartIndex);
    moveItemInArray(this.dataSource, event.previousIndex + vsStartIndex, event.currentIndex + vsStartIndex);
    this.dataSource = [...this.dataSource];
  }

}
