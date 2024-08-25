import { Task } from '../../services/task.service';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [TaskCardComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListComponent {

  @Input() dataSource: Task[] | null = [];
  ngOnInit() {
  }

}
