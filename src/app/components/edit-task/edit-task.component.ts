import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatePriority, ValidDate } from '../../shared/form.validators';
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
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTaskComponent implements OnInit, OnDestroy {

  taskService = inject(TaskService);

  private _id: number | undefined;
  @Input() set id(value: number | undefined) {
    this._id = value;
    if (value === undefined) {
      this.taskForm.reset();
      this.submitLabel = 'Add Task';
      return;
    }
    this.submitLabel = 'Update Task';
    this.getDataForTaskForm();
  }
  get id() {
    return this._id;
  }
  @Output() onClose = new EventEmitter<void>();

  taskForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    date: new FormControl<Date | undefined>(undefined, ValidDate),
    priority: new FormControl('None', ValidatePriority)
  });

  priorityOptions: Priority[] = ['None', 'Low', 'Medium', 'High'];
  taskSubscription: Subscription | undefined;

  submitLabel = 'Add Task';
  validationError: string | undefined = undefined;

  getDataForTaskForm() {
    if (!this.id) return;
    this.taskSubscription = this.taskService.getTaskById$(Number(this.id)).pipe(
      tap(task => {
        if (task) {
          this.taskForm.patchValue(task);
        }
      }
      )).subscribe();
  }

  comparePriority(a: string, b: string) {
    if (!a || !b) return false;
    return a.toLowerCase() === b.toLowerCase();
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.validationError = undefined;
      if (this.id) {
        const updatedTask = { ...this.taskForm.value, id: this.id } as Partial<Task> & { id: number; };
        this.taskService.updateTask(updatedTask);
        // this.onClose.emit();
      } else {
        const newTask = { ...this.taskForm.value } as Partial<Task> & { title: string; };
        this.taskService.addTask(newTask);
        // this.onClose.emit();
      }
    } else {
      this.validationError = 'Form is invalid. Please check the fields and try again.';
    }
  }

  onDelete() {
    if (this.id) {
      this.taskService.removeTask(this.id);
      this.id = undefined;
      this.taskForm.reset();
      // this.onClose.emit();
    }
  }

  onCancel() {
    this.taskForm.reset();
    this.id = undefined;
    this.onClose.emit();
  }

  ngOnInit() {
    this.getDataForTaskForm();
  }

  ngOnDestroy(): void {
    this.taskSubscription?.unsubscribe();
  }

}
