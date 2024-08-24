import { Component } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, Router } from '@angular/router';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatSelect } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { map, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-task-overview',
  standalone: true,
  imports: [
    ListComponent,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    AsyncPipe
  ],
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



  filterGroup = new FormGroup({
    completionStatusFilter: new FormControl('all'),
    priorityFilter: new FormControl('all')
  });

  filteredData$ = this.filterGroup.valueChanges.pipe(
    startWith(this.filterGroup.value),
    map(({ completionStatusFilter, priorityFilter }) => {
      console.log('Filtering with:', completionStatusFilter, priorityFilter);
      const filteredCompletion = this.DATA.filter(item => {
        if (completionStatusFilter === 'completed')
          return item.completed;
        if (completionStatusFilter === 'incomplete')
          return !item.completed;
        return true;
      });
      const filtered = filteredCompletion.filter(item => {
        if (priorityFilter === 'all' || priorityFilter == undefined)
          return true;
        return item.priority.toLowerCase() === priorityFilter.toLowerCase();
      });
      return filtered;
    })
  );

  constructor(private router: Router) {}

  navigateToEditTask(item: any) {
    console.log('Navigating to edit task with id:', item);
    this.router.navigate(['edit-task', item.id]);
  }

}
