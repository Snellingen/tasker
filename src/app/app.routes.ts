import { Routes } from '@angular/router';
import { TaskOverviewComponent } from './components/task-overview/task-overview.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { TaskCardComponent } from './components/task-card/task-card.component';

export const routes: Routes = [
  { path: '', redirectTo: 'task-overview', pathMatch: 'full' },
  { path: 'task-overview', component: TaskOverviewComponent },
  { path: 'edit-task/:id',  loadComponent: () => import('./components/edit-task/edit-task.component').then(m => m.EditTaskComponent)},
  { path: 'edit-task',  loadComponent: () => import('./components/edit-task/edit-task.component').then(m => m.EditTaskComponent) },
  { path: 'card', component: TaskCardComponent},
];