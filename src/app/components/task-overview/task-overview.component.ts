import { Component } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-task-overview',
  standalone: true,
  imports: [ListComponent, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './task-overview.component.html',
  styleUrl: './task-overview.component.scss'
})
export class TaskOverviewComponent {

  DISPLAY_COLUMNS = [ 'title', 'date', 'priority', 'completed'];
  DATA = [
    { id: 1, title: 'Buy groceries', date: new Date('2022-01-01'), priority: 'High', completed: false },
    { id: 2, title: 'Do laundry', date: new Date('2022-01-02'), priority: 'Medium', completed: true },
    { id: 3, title: 'Clean the house', date: new Date('2022-01-03'), priority: 'Low', completed: false }
  ];

  constructor(private router: Router) {}

  navigateToEditTask(item: any) {
    console.log('Navigating to edit task with id:', item);
    this.router.navigate(['edit-task', item.id]);
  }

}
