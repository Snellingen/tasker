import { AbstractControl } from '@angular/forms';

export function ValidateDateInFuture(control: AbstractControl) {
  const date = new Date(control.value);
  const now = new Date();
  if (date < now) {
    return { dateInPast: true };
  }
  return null;
}

export function ValidatePriority(control: AbstractControl) {
  const priority = control.value;
  if (priority === 'High' || priority === 'Medium' || priority === 'Low') {
    return null;
  }
  return { invalidPriority: true };
}