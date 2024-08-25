import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidateDateInFuture, ValidatePriority } from '../../shared/form.validators';
import { Task, TaskService } from '../../services/task.service';
import { tap } from 'rxjs';


@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTaskComponent implements OnInit, OnDestroy{

  taskService = inject(TaskService);

  pageTitle = 'Edit Task';
  @Input() id: string | undefined;

  taskForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    date: new FormControl<Date>(new Date(), ValidateDateInFuture),
    priority: new FormControl('', ValidatePriority)
  });

  taskSubscription = this.taskService.tasks$.subscribe();

  ngOnInit() {
    console.log('id', this.id);
    if (this.id) {
      this.pageTitle = 'Edit Task ' + this.id;
      this.taskSubscription = this.taskService.getTaskById$(Number(this.id)).pipe(
        tap(task => {
          if (task) {
            this.taskForm.patchValue(task);
          }
        }
      )).subscribe()
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      console.log('Valid form submitted', this.taskForm.value);
      if (this.id) {
        const updatedTask = { ...this.taskForm.value, id: Number(this.id) } as Partial<Task> & { id: number };
        this.taskService.updateTask(Number(this.id), updatedTask);
      } else {
        const newTask = { ...this.taskForm.value, id: this.taskService.rawTasks.length + 1 } as Task;
        this.taskService.addTask(newTask);
      }
    } else {
      console.log('Invalid form submitted', this.taskForm.value);
    }
  }

  ngOnDestroy(): void {
    this.taskSubscription.unsubscribe();
  }

}
