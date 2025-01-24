import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

// Default input field
@Component({
  selector: 'app-input',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() placeholder: string = '';
  @Input() control: FormControl = new FormControl();

  getErrorMessage() {
    return this.control.hasError('required') ? 'This field is mandatory' :
      this.control.hasError('email') ? 'The email is invalid' :
        this.control.hasError('minlength') ? 'The password must be at least 8 characters long' :
          '';
  }
}
