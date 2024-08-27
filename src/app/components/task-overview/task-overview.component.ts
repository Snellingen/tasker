import { ChangeDetectionStrategy, Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, Router } from '@angular/router';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { AsyncPipe } from '@angular/common';
import { MatSelect } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {  map, startWith, Subscription, tap, } from 'rxjs';
import { SortingDirection, SortingFields, Task, TaskFilters, TaskService, TaskSorting } from '../../services/task.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CardListComponent } from '../card-list/card-list.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

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
export class TaskOverviewComponent implements OnInit, OnDestroy{

  taskService = inject(TaskService);
  router = inject(Router);


  filterGroup = new FormGroup({
    completionStatusFilters: new FormControl<string[]>([]),
    priorityFilters: new FormControl<string[]>([])
  });

  sortGroup = new FormGroup({
    selectedSort: new FormControl<SortingFields>('custom'),
    selectedSortDirection: new FormControl<SortingDirection>('asc')
  });

  disableDrag$ = this.sortGroup.valueChanges.pipe(
    map(sort => sort.selectedSort !== 'custom')
  );

  isLoading$ = this.taskService.isLoading$;
  tasks$ = this.taskService.filteredSortedTasks$;

  navigateToEditTask(item: any) {
    this.router.navigate(['edit-task', item.id]);
  }

  private filterSub: Subscription | undefined;
  private sortSub: Subscription | undefined;

  ngOnInit() {
    console.log('TaskOverviewComponent ngOnInit');
    this.filterSub = this.filterGroup.valueChanges.pipe(
      startWith(this.filterGroup.value
    )).subscribe(filter => {
        const taskFilters = filter as TaskFilters
        console.log('filter', taskFilters);
        this.taskService.setFilter(taskFilters);
    });

    this.sortSub = this.sortGroup.valueChanges.pipe(startWith(this.sortGroup.value))
      .subscribe((sort) => {
        const taskSort = sort as TaskSorting;
        console.log('sort', taskSort);
        this.taskService.setSort(taskSort);
    });
  }

  ngOnDestroy() {
    this.filterSub?.unsubscribe();
    this.sortSub?.unsubscribe();
  }

}
