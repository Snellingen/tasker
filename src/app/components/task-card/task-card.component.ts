import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { Task } from '../../services/task.service';
import { MatCheckbox } from '@angular/material/checkbox';
import { DateToStringPipe } from '../../pipes/date-to-string.pipe';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatRippleModule,
    MatCheckbox,
    DateToStringPipe,
    MatIconModule,
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCardComponent {

  @Input() task: Task | null = {
    id: 1,
    title: 'Task title',
    completed: false,
    date: new Date(),
    priority: 'Low'
  } as Task
  onTaskCompletedChange() {
    console.log('Task completed');
  }

  @Output() Clicked = new EventEmitter<number>();

}
