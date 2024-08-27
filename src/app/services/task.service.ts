import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, delay, filter, map, of, shareReplay, startWith, tap } from 'rxjs';
import { compareCompleted, compareDate, comparePriority, compareString } from '../shared/compare';

export type Priority = 'High' | 'Medium' | 'Low' | 'None';
export interface Task {
  id: number;
  title?: string;
  date?: Date;
  priority?: Priority;
  completed: boolean;
}

export interface TaskFilters {
  completionStatusFilters: string[];
  priorityFilters: string[];

}

export type SortingFields = TaskField | 'custom';
export type SortingDirection = 'asc' | 'desc';
export interface TaskSorting {
  selectedSort: SortingFields
  selectedSortDirection: SortingDirection
}

export type TaskField = keyof Task;
const DISPLAY_COLUMNS: TaskField[] = ['title', 'date', 'priority', 'completed'];
const DATA: Task[] = [
  { id: 1, title: 'Buy groceries', date: new Date('2022-01-01'), priority: 'None', completed: false },
  { id: 2, title: 'Do laundry', date: new Date('2022-01-02'), priority: 'Medium', completed: true },
  { id: 3, title: 'Clean the house', date: new Date('2022-01-03'), priority: 'Low', completed: false },
  { id: 4, title: 'Go to the gym', date: new Date('2022-01-04'), priority: 'High', completed: true },
  { id: 5, title: 'Cook dinner', date: new Date('2022-01-05'), priority: 'Medium', completed: false },
  { id: 6, title: 'Walk the dog', date: new Date('2022-01-06'), priority: 'Low', completed: true },
  { id: 7, title: 'Clean the car', date: new Date('2022-01-07'), priority: 'High', completed: false },
  { id: 8, title: 'Read a book', date: new Date('2022-01-08'), priority: 'Medium', completed: true },
  { id: 9, title: 'Go to the movies', date: new Date('2022-01-09'), priority: 'Low', completed: false },
  { id: 10, title: 'Take a nap', date: new Date('2022-01-10'), priority: 'High', completed: true },
  { id: 11, title: 'Go for a run', date: new Date('2022-01-11'), priority: 'Medium', completed: false },
  { id: 12, title: 'Call a friend', date: new Date('2022-01-12'), priority: 'Low', completed: true },
  { id: 13, title: 'Go to the beach', date: new Date('2022-01-13'), priority: 'High', completed: false },
  { id: 14, title: 'Take a shower', date: new Date('2022-01-14'), priority: 'Medium', completed: true },
  { id: 15, title: 'Go to bed', date: new Date('2022-01-15'), priority: 'Low', completed: false },
  { id: 16, title: 'Wake up', date: new Date('2022-01-16'), priority: 'High', completed: true },
  { id: 17, title: 'Brush teeth', date: new Date('2022-01-17'), priority: 'Medium', completed: false },
  { id: 18, title: 'Eat breakfast', date: new Date('2022-01-18'), priority: 'Low', completed: true },
  { id: 19, title: 'Go to work', date: new Date('2022-01-19'), priority: 'High', completed: false },
  { id: 20, title: 'Go to school', date: new Date('2022-01-20'), priority: 'Medium', completed: true },
  { id: 21, title: 'Go to the park', date: new Date('2022-01-21'), priority: 'Low', completed: false },
  { id: 22, title: 'Go to the zoo', date: new Date('2022-01-22'), priority: 'High', completed: true },
  { id: 23, title: 'Go to the library', date: new Date('2022-01-23'), priority: 'Medium', completed: false },
  { id: 24, title: 'Go to the store', date: new Date('2022-01-24'), priority: 'Low', completed: true },
  { id: 25, title: 'Go to the restaurant', date: new Date('2022-01-25'), priority: 'High', completed: false },
  { id: 26, title: 'Go to the bar', date: new Date('2022-01-26'), priority: 'Medium', completed: true },
  { id: 27, title: 'Go to the club', date: new Date('2022-01-27'), priority: 'Low', completed: false },
  { id: 28, title: 'Go to the beach', date: new Date('2022-01-28'), priority: 'High', completed: true },
  { id: 29, title: 'Go to the mountains', date: new Date('2022-01-29'), priority: 'Medium', completed: false },
  { id: 30, title: 'Go to the lake', date: new Date('2022-01-30'), priority: 'Low', completed: true },
  { id: 31, title: 'Go to the river', date: new Date('2022-01-31'), priority: 'High', completed: false },
  { id: 32, title: 'Go to the ocean', date: new Date('2022-02-01'), priority: 'Medium', completed: true },
  { id: 33, title: 'Go to the sea', date: new Date('2022-02-02'), priority: 'Low', completed: false },
  { id: 34, title: 'Go to the pool', date: new Date('2022-02-03'), priority: 'High', completed: true },
  { id: 35, title: 'Go to the gym', date: new Date('2022-02-04'), priority: 'Medium', completed: false },
  { id: 36, title: 'Go to the park', date: new Date('2022-02-05'), priority: 'Low', completed: true },
  { id: 37, title: 'Go to the zoo', date: new Date('2022-02-06'), priority: 'High', completed: false },
  { id: 38, title: 'Go to the library', date: new Date('2022-02-07'), priority: 'Medium', completed: true },
  { id: 39, title: 'Go to the store', date: new Date('2022-02-08'), priority: 'Low', completed: false },
  { id: 40, title: 'Go to the restaurant', date: new Date('2022-02-09'), priority: 'High', completed: true },
  { id: 41, title: 'Go to the bar', date: new Date('2022-02-10'), priority: 'Medium', completed: false },
  { id: 42, title: 'Go to the club', date: new Date('2022-02-11'), priority: 'Low', completed: true },
  { id: 43, title: 'Go to the beach', date: new Date('2022-02-12'), priority: 'High', completed: false },
  { id: 44, title: 'Go to the mountains', date: new Date('2022-02-13'), priority: 'Medium', completed: true },
  { id: 45, title: 'Go to the lake', date: new Date('2022-02-14'), priority: 'Low', completed: false },
  { id: 46, title: 'Go to the river', date: new Date('2022-02-15'), priority: 'High', completed: true },
  { id: 47, title: 'Go to the ocean', date: new Date('2022-02-16'), priority: 'Medium', completed: false },
  { id: 48, title: 'Go to the sea', date: new Date('2022-02-17'), priority: 'Low', completed: true },
  { id: 49, title: 'Go to the pool', date: new Date('2022-02-18'), priority: 'High', completed: false },
  { id: 50, title: 'Go to the gym', date: new Date('2022-02-19'), priority: 'Medium', completed: true },
  { id: 51, title: 'Go to the park', date: new Date('2022-02-20'), priority: 'Low', completed: false },
  { id: 52, title: 'Go to the zoo', date: new Date('2022-02-21'), priority: 'High', completed: true },
  { id: 53, title: 'Go to the library', date: new Date('2022-02-22'), priority: 'Medium', completed: false },
  { id: 54, title: 'Go to the store', date: new Date('2022-02-23'), priority: 'Low', completed: true },
  { id: 55, title: 'Go to the restaurant', date: new Date('2022-02-24'), priority: 'High', completed: false },
  { id: 56, title: 'Go to the bar', date: new Date('2022-02-25'), priority: 'Medium', completed: true },
  { id: 57, title: 'Go to the club', date: new Date('2022-02-26'), priority: 'Low', completed: false },
  { id: 58, title: 'Go to the beach', date: new Date('2022-02-27'), priority: 'High', completed: true },
  { id: 59, title: 'Go to the mountains', date: new Date('2022-02-28'), priority: 'Medium', completed: false },
  { id: 60, title: 'Go to the lake', date: new Date('2022-03-01'), priority: 'Low', completed: true },
  { id: 61, title: 'Go to the river', date: new Date('2022-03-02'), priority: 'High', completed: false },
  { id: 62, title: 'Go to the ocean', date: new Date('2022-03-03'), priority: 'Medium', completed: true },
  { id: 63, title: 'Go to the sea', date: new Date('2022-03-04'), priority: 'Low', completed: false },
  { id: 64, title: 'Go to the pool', date: new Date('2022-03-05'), priority: 'High', completed: true },
];


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  rawTasks = DATA;

  isLoading$ = new BehaviorSubject(true);
  displayedColumns$ = of(DISPLAY_COLUMNS);
  tasks$ = of(this.rawTasks).pipe(delay(1000), tap(() => this.isLoading$.next(false)), shareReplay());
  activeFilter$ = new BehaviorSubject<TaskFilters>({ completionStatusFilters: [], priorityFilters: [] })
  activeSort$ = new BehaviorSubject<TaskSorting>({ selectedSort: 'custom', selectedSortDirection: 'asc' });

  filteredTasks$ = combineLatest([this.activeFilter$, this.tasks$]).pipe(
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

  filteredSortedTasks$ = combineLatest([this.filteredTasks$, this.activeSort$]).pipe(
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

  setFilter(filter: TaskFilters) {
    this.activeFilter$.next(filter);
  }

  setSort(sort: TaskSorting) {
    this.activeSort$.next(sort);
  }

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
    return this.tasks$.pipe( map(tasks => tasks.find(task => task.id === id)));
  }

  constructor() { }
}
