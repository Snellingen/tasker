import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidateDateInFuture, ValidatePriority } from '../../shared/form.validators';
import { Priority, Task, TaskService } from '../../services/task.service';
import { Subscription, tap } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()],
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
    date: new FormControl<Date|undefined>(undefined, ValidateDateInFuture),
    priority: new FormControl('None', ValidatePriority)
  });

  priorityOptions: Priority[] = ['None', 'Low', 'Medium', 'High'];

  taskSubscription: Subscription | undefined;

  getDataForTaskForm() {
    if (!this.id) return;
    this.pageTitle = 'Edit Task ' + this.id;
    this.taskSubscription = this.taskService.getTaskById$(Number(this.id)).pipe(
      tap(task => {
        if (task) {
          console.log('patch', task);
          this.taskForm.patchValue(task);
        }
      }
    )).subscribe()
  }

  comparePriority(a: string, b: string) {
    return a.toLowerCase() === b.toLowerCase();
  }

  onSubmit() {
    if (this.taskForm.valid) {
      if (this.id) {
        console.log('update', this.taskForm.value);
        const updatedTask = { ...this.taskForm.value, id: Number(this.id) } as Partial<Task> & { id: number };
        this.taskService.updateTask(Number(this.id), updatedTask);
      } else {
        console.log('add', this.taskForm.value);
        const newTask = { ...this.taskForm.value } as Partial<Task> & { title: string};
        this.taskService.addTask(newTask);
      }
    } else {
      console.log('invalid form');
    }
  }

  ngOnInit() {
    this.getDataForTaskForm();
  }

  ngOnDestroy(): void {
    this.taskSubscription?.unsubscribe();
  }

}
