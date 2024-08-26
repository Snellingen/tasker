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
import { combineLatest, map, startWith, tap, } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CardListComponent } from '../card-list/card-list.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { compareCompleted, compareDate, comparePriority, compareString } from '../../shared/compare';

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
    MatProgressSpinner,
    CardListComponent,
    MatButtonToggleModule,
    MatCheckboxModule,
  ],
  templateUrl: './task-overview.component.html',
  styleUrl: './task-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskOverviewComponent {

  taskService = inject(TaskService);
  router = inject(Router);


  filterGroup = new FormGroup({
    completionStatusFilters: new FormControl(),
    priorityFilters: new FormControl()
  });

  sortGroup = new FormGroup({
    selectedSort: new FormControl('custom'),
    selectedSortDirection: new FormControl('asc')
  });

  filter$ = this.filterGroup.valueChanges.pipe(startWith(this.filterGroup.value));
  disableDrag$ = this.sortGroup.valueChanges.pipe(
    map(sort => sort.selectedSort !== 'custom')
  );

  tasks$ = this.taskService.tasks$;
  filteredData$ = combineLatest([this.filter$, this.tasks$]).pipe(
    map(([filterValues, tasks]) => {
      const { completionStatusFilters, priorityFilters } = filterValues;
      return tasks.filter(item => {
        if (!completionStatusFilters || completionStatusFilters.length === 0) {
          return true;
        }
        return completionStatusFilters.includes(item.completed ? 'completed' : 'incomplete');

      }).filter(item => {
        if (!priorityFilters || priorityFilters.length === 0) {
          return true;
        }
        return priorityFilters.includes(item.priority?.toLowerCase() ?? '');
      });
    })
  );

  displayedColumns$ = this.taskService.displayedColumns$;

  sort$ = this.sortGroup.valueChanges.pipe(startWith(this.sortGroup.value));

  sortedData$ = combineLatest([this.filteredData$, this.sort$]).pipe(
    map(([data, sort]) => {
      const isAsc = sort.selectedSortDirection === 'asc';
      if (sort.selectedSort === 'custom') {
        return [...data]; // keeps the order as is from service
      }
      return [...data].sort((a, b) => {
        switch (sort.selectedSort) {
          case 'title': return compareString(a.title, b.title, isAsc);
          case 'date': return compareDate(a.date, b.date, isAsc);
          case 'priority': return comparePriority(a.priority, b.priority, isAsc);
          case 'completed': return compareCompleted(a.completed, b.completed, isAsc);
          default: return 0;
        }
      });
    }),
    );

  navigateToEditTask(item: any) {
    this.router.navigate(['edit-task', item.id]);
  }

}
