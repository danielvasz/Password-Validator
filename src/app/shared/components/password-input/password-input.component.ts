import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

type TypePassword = 'newpassword' | 'confirmpassword';
enum ErrorText {
  REQUIRED = 'You must enter a value',
  MINLENGTH = 'At least 8 characters long.',
  LOWECASE = 'One lowercase character.',
  UPPERCASE = 'One uppercase character.',
  SPECIALCHARACTER = 'One number, symbol, or whitespace character.',
  NOMATCH = 'Password no match'
};

@Component({
  selector: 'app-password-input',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss'
})
export class PasswordInputComponent {
  @Input() typePassword: TypePassword = 'newpassword';
  @Input() formController!: FormControl;
  @Input() disabeButton: boolean = false;
  @Output() resultPassword = new EventEmitter<any>();;

  public hide = signal(true);
  public mainForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formController.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => (
      this.resultPassword.emit({
        value: value
      })
    ));
  }
  
  public clickEvent(event: MouseEvent): void {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  public changeTitle(typePassword: TypePassword): string {
    let password = typePassword === 'newpassword' ? 'New password'
    : 'Confirm password';
    return password;
  }

  public errorMessage(): string {
    if (this.formController.hasError('required')) {
      return ErrorText.REQUIRED;
    }

    if (this.formController.hasError('lowercase')) {
      return ErrorText.LOWECASE;
    }

    if (this.formController.hasError('uppercase')) {
      return ErrorText.UPPERCASE;
    }

    if (this.formController.hasError('specialCharacter')) {
      return ErrorText.SPECIALCHARACTER;
    }

    if (this.formController.hasError('passNoMatch')) {
      return ErrorText.NOMATCH;
    }

    if (this.formController.hasError('minlength')) {
      return ErrorText.MINLENGTH;
    }

    return '';
  }

}
