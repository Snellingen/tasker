import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
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
import { SortingDirection, SortingField, Task, TaskFilters, TaskService, TaskSorting } from '../../services/task.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CardListComponent } from '../card-list/card-list.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { StackedBarComponent } from '../stacked-bar/stacked-bar.component';

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
    EditTaskComponent,
    StackedBarComponent
  ],
  templateUrl: './task-overview.component.html',
  styleUrl: './task-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskOverviewComponent implements OnInit, OnDestroy{

  taskService = inject(TaskService);
  router = inject(Router);
  changeDetectionRef = inject(ChangeDetectorRef);


  filterGroup = new FormGroup({
    completionStatusFilters: new FormControl<string[]>([]),
    priorityFilters: new FormControl<string[]>([])
  });

  sortGroup = new FormGroup({
    selectedSort: new FormControl<SortingField>('custom'),
    selectedSortDirection: new FormControl<SortingDirection>('asc')
  });

  disableDrag$ = this.sortGroup.valueChanges.pipe(
    map(sort => sort.selectedSort !== 'custom')
  );

  isLoading$ = this.taskService.isLoading$;
  tasks$ = this.taskService.filteredSortedTasks$;

  stackedBarData$ = this.taskService.tasks$.pipe(
    map(tasks => {
      const total = tasks.length;
      const completed = tasks.filter(t => t.completed).length;
      // const inProgress = tasks.filter(t => !t.completed).length;
      const lowPriority = tasks.filter(t => t.priority && t.priority === 'Low').length;
      const mediumPriority = tasks.filter(t => t.priority === 'Medium').length;
      const highPriority = tasks.filter(t => t.priority === 'High').length;
      const noPriority = tasks.filter(t => t.priority === 'None').length;
      return [
        { label: `Done (${completed})`, value: completed },
        { label: `Low (${lowPriority})`, value: lowPriority },
        { label: `Medium (${mediumPriority})`, value: mediumPriority },
        { label: `High (${highPriority})`, value: highPriority },
        { label: `None (${noPriority})`, value: noPriority }
      ];
    })
  );

  showEditTask = false;
  selectedTaskId: number | undefined;

  private filterSub: Subscription | undefined;
  private sortSub: Subscription | undefined;

  onNewTaskClick() {
    this.showEditTask = true;
    this.selectedTaskId = undefined;
  }

  onTaskClick(id: number) {
    this.selectedTaskId = id;
    this.showEditTask = true;
  }

  onEditClose() {
    this.showEditTask = false;
    this.selectedTaskId = undefined;
  }

  onTaskCheckedChange(event: {id: number, checked: boolean}) {
    this.taskService.updateTask({ id: event.id, completed: event.checked });
  }

  ngOnInit() {
    this.filterSub = this.filterGroup.valueChanges
      .subscribe(filter => {
        const taskFilters = filter as TaskFilters
        this.taskService.setFilter(taskFilters);
    });

    this.sortSub = this.sortGroup.valueChanges
      .subscribe((sort) => {
        const taskSort = sort as TaskSorting;
        this.taskService.setSort(taskSort);
    });

    this.taskService.activeFilter$
      .subscribe( filter => {
        this.filterGroup.patchValue(filter, { emitEvent: false })
      });
  }

  ngOnDestroy() {
    this.filterSub?.unsubscribe();
    this.sortSub?.unsubscribe();
  }

}
