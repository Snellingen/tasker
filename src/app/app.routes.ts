import { Routes } from '@angular/router';
import { TaskOverviewComponent } from './components/task-overview/task-overview.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';

export const routes: Routes = [
  { path: '', redirectTo: 'task-overview', pathMatch: 'full' },
  { path: 'task-overview', component: TaskOverviewComponent },
  { path: 'edit-task/:id',  component: EditTaskComponent },
  { path: 'edit-task',  component: EditTaskComponent },
];
