import { Task } from '../../services/task.service';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [TaskCardComponent, ScrollingModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListComponent implements AfterViewInit {

  @Input() dataSource: Task[] | null = [];
  @ViewChild('wrapper', { static: true }) wrapper!: ElementRef;
  @ViewChild('viewport', { static: true }) viewport!: ElementRef;

  ngAfterViewInit() {
    const wrapperHeight = this.wrapper.nativeElement.offsetHeight;
    console.log('Wrapper height:', wrapperHeight);
    this.viewport.nativeElement.style.height = `${wrapperHeight}px`;
  }

  itemPixelSize = 62;
  minBufferPx = 2 * this.itemPixelSize;
  maxBufferPx = 2 * this.itemPixelSize;

}
