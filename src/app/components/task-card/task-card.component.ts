import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { Task } from '../../services/task.service';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [MatCardModule, MatRippleModule, MatCheckbox],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {

  task = {
    id: 1,
    title: 'Task title',
    completed: false,
    date: new Date(),
    priority: 'Medium',
  } as Task

  editTask() {
    console.log('Edit task');
  }

  deleteTask() {
    console.log('Delete task');
  }

  onTaskCompletedChange() {
    console.log('Task completed');
  }

}
