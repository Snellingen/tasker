import { Injectable } from '@angular/core';
import { delay, map, of } from 'rxjs';

export interface Task {
  id: number;
  title?: string;
  date?: Date;
  priority?: 'High' | 'Medium' | 'Low';
  completed: boolean;
}

export type TaskField = keyof Task;
const DISPLAY_COLUMNS: TaskField[] = ['title', 'date', 'priority', 'completed'];
const DATA: Task[] = [
  { id: 1, title: 'Buy groceries', date: new Date('2022-01-01'), priority: 'High', completed: false },
  { id: 2, title: 'Do laundry', date: new Date('2022-01-02'), priority: 'Medium', completed: true },
  { id: 3, title: 'Clean the house', date: new Date('2022-01-03'), priority: 'Low', completed: false }
];


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  rawTasks = DATA;

  tasks$ = of(this.rawTasks);
  displayedColumns$ = of(DISPLAY_COLUMNS).pipe(delay(1000));

  addTask(task: Task) {
    this.rawTasks.push(task);
    this.tasks$ = of(this.rawTasks);
  }

  removeTask(id: number) {
    this.rawTasks = this.rawTasks.filter(task => task.id !== id);
    this.tasks$ = of(this.rawTasks);
  }

  updateTask(id: number, task: Partial<Task> & { id: number }) {
    const index = this.rawTasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.rawTasks[index] = { ...this.rawTasks[index], ...task };
      this.tasks$ = of(this.rawTasks);
    }
  }

  getTaskById$(id: number) {
    return this.tasks$.pipe( map(tasks => tasks.find(task => task.id === id)), delay(1000) );
  }

  constructor() { }
}
