import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, delay, filter, map, of, shareReplay, startWith, tap } from 'rxjs';
import { compareCompleted, compareDate, comparePriority, compareString } from '../shared/compare';
import { moveItemInArray } from '@angular/cdk/drag-drop';

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

export type SortingField = TaskField | 'custom';
export type SortingDirection = 'asc' | 'desc';
export interface TaskSorting {
  selectedSort: SortingField
  selectedSortDirection: SortingDirection
}

export type TaskField = keyof Task;
const DISPLAY_COLUMNS: TaskField[] = ['title', 'date', 'priority', 'completed'];
const DATA: Task[] = [
  { id: 10000001, title: 'Buy groceries', date: new Date('2022-01-01'), priority: 'None', completed: false },
  { id: 10000002, title: 'Do laundry', date: new Date('2022-01-02'), priority: 'Medium', completed: true },
  { id: 10000003, title: 'Clean the house and empty the dishwasher', date: new Date('2022-01-03'), priority: 'Low', completed: false },
  { id: 10000004, title: 'Go to the gym', date: new Date('2022-01-04'), priority: 'Low', completed: true },
  { id: 10000005, title: 'Cook dinner', date: new Date('2022-01-05'), priority: 'Medium', completed: false },
  { id: 10000006, title: 'Walk the dog', date: new Date('2022-01-06'), priority: 'Low', completed: false },
  { id: 10000007, title: 'Clean the car', date: new Date('2022-01-07'), priority: 'Low', completed: false },
  { id: 10000008, title: 'Read a book', date: new Date('2022-01-08'), priority: 'Medium', completed: false },
  { id: 10000009, title: 'Go to the movies', date: new Date('2022-01-09'), priority: 'Low', completed: false },
  { id: 100000010, title: 'Take a nap', date: new Date('2022-01-10'), priority: 'Medium', completed: false },
  { id: 100000011, title: 'Go for a run', date: new Date('2022-01-11'), priority: 'Medium', completed: false },
  { id: 100000012, title: 'Call a friend', date: new Date('2022-01-12'), priority: 'Low', completed: false },
  { id: 100000013, title: 'Go to the beach', date: new Date('2022-01-13'), priority: 'High', completed: false },
  { id: 100000014, title: 'Take a shower', date: new Date('2022-01-14'), priority: 'Medium', completed: true },
  { id: 100000015, title: 'Go to bed', date: new Date('2022-01-15'), priority: 'Low', completed: false },
  { id: 100000016, title: 'Wake up', date: new Date('2022-01-16'), priority: 'High', completed: false },
  { id: 100000017, title: 'Brush teeth', date: new Date('2022-01-17'), priority: 'None', completed: false },
  { id: 100000018, title: 'Eat breakfast', date: new Date('2022-01-18'), priority: 'Low', completed: false },
  { id: 100000019, title: 'Go to work', date: new Date('2022-01-19'), priority: 'High', completed: false },
  { id: 100000020, title: 'Go to school', date: new Date('2022-01-20'), priority: 'None', completed: true },
  { id: 100000021, title: 'Go to the park', date: new Date('2022-01-21'), priority: 'None', completed: false },
  { id: 100000022, title: 'Go to the zoo', date: new Date('2022-01-22'), priority: 'None', completed: true },
  { id: 100000023, title: 'Go to the library', date: new Date('2022-01-23'), priority: 'None', completed: false },
  { id: 100000024, title: 'Go to the store', date: new Date('2022-01-24'), priority: 'Low', completed: true },
  { id: 100000025, title: 'Go to the restaurant', date: new Date('2022-01-25'), priority: 'Medium', completed: false },
  { id: 100000026, title: 'Go to the bar', date: new Date('2022-01-26'), priority: 'Medium', completed: true },
  { id: 100000027, title: 'Go to the club', date: new Date('2022-01-27'), priority: 'None', completed: false },
  { id: 100000028, title: 'Go to the beach', date: new Date('2022-01-28'), priority: 'High', completed: true },
  { id: 100000029, title: 'Go to the mountains', date: new Date('2022-01-29'), priority: 'Medium', completed: false },
  { id: 100000030, title: 'Go to the lake', date: new Date('2022-01-30'), priority: 'Low', completed: true },
  { id: 100000031, title: 'Go to the river', date: new Date('2022-01-31'), priority: 'None', completed: false },
  { id: 100000032, title: 'Go to the ocean', date: new Date('2022-02-01'), priority: 'Medium', completed: true },
  { id: 100000033, title: 'Go to the sea', date: new Date('2022-02-02'), priority: 'Low', completed: false },
  { id: 100000034, title: 'Go to the pool', date: new Date('2022-02-03'), priority: 'None', completed: true },
  { id: 100000035, title: 'Go to the gym', date: new Date('2022-02-04'), priority: 'Medium', completed: false },
  { id: 100000036, title: 'Go to the park', date: new Date('2022-02-05'), priority: 'Low', completed: true },
  { id: 100000037, title: 'Go to the zoo', date: new Date('2022-02-06'), priority: 'High', completed: false },
  { id: 100000038, title: 'Go to the library', date: new Date('2022-02-07'), priority: 'Medium', completed: true },
  { id: 100000039, title: 'Go to the store', date: new Date('2022-02-08'), priority: 'Low', completed: false },
  { id: 100000040, title: 'Go to the restaurant', date: new Date('2022-02-09'), priority: 'High', completed: true },
  { id: 100000041, title: 'Go to the bar', date: new Date('2022-02-10'), priority: 'Medium', completed: false },
  { id: 100000042, title: 'Go to the club', date: new Date('2022-02-11'), priority: 'Low', completed: true },
  { id: 100000043, title: 'Go to the beach', date: new Date('2022-02-12'), priority: 'High', completed: false },
  { id: 100000044, title: 'Go to the mountains', date: new Date('2022-02-13'), priority: 'Medium', completed: true },
  { id: 100000045, title: 'Go to the lake', date: new Date('2022-02-14'), priority: 'Low', completed: false },
  { id: 100000063, title: 'Go to the sea', date: new Date('2022-03-04'), priority: 'Low', completed: false },
  { id: 100000064, title: 'Go to the pool', date: new Date('2022-03-05'), priority: 'High', completed: true },
];


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  cachedTasks = DATA;
  useLocalStorage = true;
  isLoading$ = new BehaviorSubject(true);
  displayedColumns$ = of(DISPLAY_COLUMNS);
  tasks$ = new BehaviorSubject<Task[]>([]);

  // ! Use DELAY to simulate a network request
  fetchTasks$ = of(this.getTaskFromLocalStorage()).pipe(tap(() => this.isLoading$.next(false)));

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
    if (this.useLocalStorage) {
      localStorage.setItem('settings', JSON.stringify({ ...filter, ...this.activeSort$.value }));
    }
  }

  setSort(sort: TaskSorting) {
    this.activeSort$.next(sort);
    if (this.useLocalStorage) {
      localStorage.setItem('settings', JSON.stringify({ ...this.activeFilter$.value, ...sort }));
    }
  }

  addTask(task: Partial<Task>) {
    if (!task.title) {
      return;
    }
    const id = Math.floor(Math.random() * Math.pow(10, 15));
    const newTask = { id, ...task, completed: false };
    this.cachedTasks.push(newTask);
    this.tasks$.next(this.cachedTasks);
    if (this.useLocalStorage) {
      localStorage.setItem('tasks', JSON.stringify(this.cachedTasks));
    }
  }

  removeTask(id: number) {
    this.cachedTasks = this.cachedTasks.filter(task => task.id !== id);
    this.tasks$.next(this.cachedTasks);
    if (this.useLocalStorage) {
      localStorage.setItem('tasks', JSON.stringify(this.cachedTasks));
    }
  }

  updateTask(task: Partial<Task> & { id: number }) {
    const index = this.cachedTasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.cachedTasks[index] = { ...this.cachedTasks[index], ...task };
      this.tasks$.next(this.cachedTasks);
      if (this.useLocalStorage) {
        localStorage.setItem('tasks', JSON.stringify(this.cachedTasks));
      }
    }
  }

  moveTaskById(taskIdToMove: number, itemAboveId: number) {
    const prevIndex = this.cachedTasks.findIndex(task => task.id === taskIdToMove);
    if (prevIndex < 0) {
      return;
    }
    let newIndex = this.cachedTasks.findIndex(task => task.id === itemAboveId) + 1;
    if (newIndex < 0 ) {
      newIndex = 0;
    }
    if(newIndex > this.cachedTasks.length) {
      newIndex = this.cachedTasks.length - 1;
    }
    this.moveTask(prevIndex, newIndex);
  }

  moveTask(prevIndex: number, newIndex: number) {
    const tempArray = [...this.cachedTasks];
    moveItemInArray(tempArray, prevIndex, newIndex);
    this.cachedTasks = tempArray;
    this.tasks$.next(tempArray);
    if (this.useLocalStorage) {
      localStorage.setItem('tasks', JSON.stringify(this.cachedTasks));
    }
  }

  getTaskById$(id: number) {
    return this.tasks$.pipe( map(tasks => tasks.find(task => task.id === id)));
  }

  getTaskFromLocalStorage() {
    if (!this.useLocalStorage) {
      return DATA;
    }
    const storedJsonTasks = JSON.parse(localStorage.getItem('tasks') ?? '[]') as Task & { date: string } [] ;
    const storedTasks = storedJsonTasks.map((task, index) => {
      const date = task.date ? new Date(task.date) : undefined;
      return { ...task, date: date } as Task
    }) as Task[];
    if (storedTasks.length === 0) {
      localStorage.setItem('tasks', JSON.stringify(DATA));
      return DATA;
    }
    return storedTasks;
  }

  getSettingsFromLocalStorage() {
    if (!this.useLocalStorage) {
      return { completionStatusFilters: [], priorityFilters: [], selectedSort: 'custom', selectedSortDirection: 'asc' };
    }
    const storedSettings = JSON.parse(localStorage.getItem('settings') ?? '{}') as TaskFilters & TaskSorting;
    if (Object.keys(storedSettings).length === 0) {
      localStorage.setItem('settings', JSON.stringify({ completionStatusFilters: [], priorityFilters: [], selectedSort: 'custom', selectedSortDirection: 'asc' }));
      return { completionStatusFilters: [], priorityFilters: [], selectedSort: 'custom', selectedSortDirection: 'asc' };
    }
    return storedSettings;
  }

  constructor() {
    this.fetchTasks$.subscribe(tasks => {
      this.cachedTasks = tasks;
      console.log('Tasks:', tasks);
      this.tasks$.next(tasks);
    });

    const storedSettings = this.getSettingsFromLocalStorage();
    this.activeFilter$.next({ completionStatusFilters: storedSettings.completionStatusFilters, priorityFilters: storedSettings.priorityFilters });
    this.activeSort$.next({ selectedSort: storedSettings.selectedSort as SortingField, selectedSortDirection: storedSettings.selectedSortDirection as SortingDirection });
  }
}
