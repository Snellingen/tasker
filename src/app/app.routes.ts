import { Routes } from '@angular/router';
import { TaskOverviewComponent } from './components/task-overview/task-overview.component';
import { StackedBarComponent } from './components/stacked-bar/stacked-bar.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskOverviewComponent },
  { path: 'tasks/edit-task/:id',  loadComponent: () => import('./components/edit-task/edit-task.component').then(m => m.EditTaskComponent)},
  { path: 'tasks/edit-task',  loadComponent: () => import('./components/edit-task/edit-task.component').then(m => m.EditTaskComponent) },
  { path: 'bar',  component: StackedBarComponent },
];