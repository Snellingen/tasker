import { TestBed } from '@angular/core/testing';

import { Task, TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should add a task', () => {
  //   const task = { title: 'Walk the dog', date: new Date('2022-01-04'), priority: 'Medium', completed: false } as Task;
  //   service.addTask(task);
  //   expect(service.cachedTasks).toContain(task);
  // });

  it('should remove a task', () => {
    const taskId = 2;
    service.removeTask(taskId);
    expect(service.cachedTasks.find(task => task.id === taskId)).toBeUndefined();
  });

  // it('should update a task', () => {
  //   const taskId = 1;
  //   const updatedTask = { id: 1, title: 'Buy groceries', date: new Date('2022-01-01'), priority: 'High', completed: true } as Task;
  //   service.updateTask(updatedTask);
  //   expect(service.cachedTasks.find(task => task.id === taskId)).toEqual(updatedTask);
  // });
});
