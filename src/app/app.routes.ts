import { Routes } from '@angular/router';
import { TaskOverviewComponent } from './components/task-overview/task-overview.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { CardListComponent } from './components/card-list/card-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'task-overview', pathMatch: 'full' },
  { path: 'task-overview', component: TaskOverviewComponent },
  { path: 'edit-task/:id',  component: EditTaskComponent },
  { path: 'edit-task',  component: EditTaskComponent },
  { path: 'card', component: TaskCardComponent},
  { path: 'card-list', component: CardListComponent}
];
