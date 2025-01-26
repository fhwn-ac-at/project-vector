import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const date = control.value;
        if (!date || isNaN(Date.parse(date))) {
            return { invalidDate: true };
        }
        return null;
    };
}