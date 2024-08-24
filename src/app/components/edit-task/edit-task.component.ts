import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ValidateDateInFuture, ValidatePriority } from '../../shared/form.validators';


@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent {
  pageTitle = 'Edit Task';
  @Input() id: string | undefined;

  taskForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    date: new FormControl('', ValidateDateInFuture),
    priority: new FormControl('', ValidatePriority)
  });

  ngOnInit() {
    console.log('id', this.id);
    if (this.id) {
      this.pageTitle = 'Edit Task ' + this.id;
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      console.log('Valid form submitted', this.taskForm.value);
    } else {
      console.log('Invalid form submitted', this.taskForm.value);
    }
  }

}
