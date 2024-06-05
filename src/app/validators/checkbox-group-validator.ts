import { AbstractControl, ValidationErrors } from '@angular/forms';

export function atLeastOneCheckboxValidator(minChecked: number = 1): ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const controls = control.value;
    let checkedCount = 0;

    for (const key in controls) {
      if (controls[key]) {
        checkedCount++;
      }
    }

    return checkedCount >= minChecked ? null : { required: true };
  };
}
