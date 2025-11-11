import { Component } from '@angular/core';
import { PasswordInputComponent } from "../../shared/components/password-input/password-input.component";
import { FormGroup, Validators, ReactiveFormsModule, FormControl} from '@angular/forms';
import { MatchPassword, ValidatePassword } from '../../shared/password.validator';
import { StrengthIndicatorComponent } from "../../shared/components/strength-indicator/strength-indicator.component";

@Component({
  selector: 'app-password-validator',
  imports: [PasswordInputComponent, ReactiveFormsModule, StrengthIndicatorComponent],
  templateUrl: './password-validator.component.html',
  styleUrl: './password-validator.component.scss'
})
export class PasswordValidatorComponent {
  public valuePassword: string = '';
  public disableButton: boolean = true;
  public passwordForm = new FormGroup({
    newPass: new FormControl('', [
      Validators.required, 
      Validators.minLength(8), 
      ValidatePassword
    ]),
    confirmPass: new FormControl('', [Validators.required])
  }, {
    validators: MatchPassword('newPass', 'confirmPass')
  });

  get passwordControl(): FormControl {
    return this.passwordForm.get('newPass') as FormControl;
  }

  get confirmPasswordControl(): FormControl {
    return this.passwordForm.get('confirmPass') as FormControl;
  }

  constructor() {}

  ngOnInit(): void {
    this.passwordForm.get('confirmPass')?.disable();
  }

  public getNewPass(value: any): void {
    this.valuePassword = value['value'];
    if (!this.passwordForm.get('newPass')?.errors) {
      this.passwordForm.get('confirmPass')?.enable();
      this.disableButton = false;
    } else {
      this.passwordForm.get('confirmPass')?.disable();
      this.disableButton = true;
    }
  }

}
