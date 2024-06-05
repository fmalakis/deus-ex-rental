import { AbstractControl, ValidationErrors } from '@angular/forms';

export function integerValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value == null || value === '') {
    return null; // don't validate empty value to allow optional field
  }
  return Number.isInteger(Number(value)) ? null : { notInteger: true };
}
