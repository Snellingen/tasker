import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, Router } from '@angular/router';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { AsyncPipe } from '@angular/common';
import { MatSelect } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, map, startWith, } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

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
    AsyncPipe,
    MatProgressSpinner
  ],
  templateUrl: './task-overview.component.html',
  styleUrl: './task-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskOverviewComponent {

  taskService = inject(TaskService);
  router = inject(Router);


  filterGroup = new FormGroup({
    completionStatusFilter: new FormControl('all'),
    priorityFilter: new FormControl('all')
  });

  filter$ = this.filterGroup.valueChanges.pipe(startWith(this.filterGroup.value));
  tasks$ = this.taskService.tasks$;
  filteredData$ = combineLatest([this.filter$, this.tasks$]).pipe(
    map(([filterValues, tasks]) => {
      const { completionStatusFilter, priorityFilter } = filterValues;
      console.log('Filtering with:', completionStatusFilter, priorityFilter);
      return tasks.filter(item => {
        if (completionStatusFilter === 'completed') {
          return item.completed;
        }
        if (completionStatusFilter === 'incomplete') {
          return !item.completed;
        }
        return true;
      }).filter(item => {
        if (priorityFilter === 'all' || priorityFilter === undefined) {
          return true;
        }
        return item.priority?.toLowerCase() === priorityFilter?.toLowerCase();
      });
    })
  );

  displayedColumns$ = this.taskService.displayedColumns$;

  navigateToEditTask(item: any) {
    console.log('Navigating to edit task with id:', item);
    this.router.navigate(['edit-task', item.id]);
  }

}
