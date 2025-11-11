import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { PasswordValidatorComponent } from './app/features/password-validator/password-validator.component';

bootstrapApplication(PasswordValidatorComponent, appConfig)
  .catch((err) => console.error(err));
