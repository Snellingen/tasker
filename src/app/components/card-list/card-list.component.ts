import { Task } from '../../services/task.service';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { ViewChild, ElementRef } from '@angular/core';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { moveItemInArray } from '@angular/cdk/drag-drop';

export interface DropLocation {
  itemId: number;
  prevIndex: number;
  newIndex: number;
  itemAboveId: number; // Used to determine location without filtering
}

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
  @Output() onItemClick = new EventEmitter<number>();
  @Output() onItemCheckedChange = new EventEmitter<{id: number, checked: boolean}>();
  @Output() onListDropLocation = new EventEmitter<DropLocation>();
  @ViewChild('wrapper', { static: true }) wrapper!: ElementRef;
  @ViewChild('viewport', { static: false }) viewport!: CdkVirtualScrollViewport;

  itemPixelSize = 62;
  minBufferPx = 2 * this.itemPixelSize;
  maxBufferPx = 2 * this.itemPixelSize;
  lastDragIndex: number = -1;
  idKey = 'task_';

  onItemDrop(event: any) {
    if (this.dataSource === null) return;
    if (this.viewport === null) return;

    const vsStartIndex = this.viewport.getRenderedRange().start;
    const dropLocation: DropLocation = {
      itemId: this.dataSource[event.previousIndex]?.id,
      prevIndex: event.previousIndex + vsStartIndex,
      newIndex:  event.currentIndex + vsStartIndex,
      itemAboveId: this.dataSource[event.currentIndex - 1]?.id
    };

    console.log('Drop Location:', dropLocation);
    this.onListDropLocation.emit(dropLocation);
  }

}
