import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import zxcvbn from 'zxcvbn';

@Component({
  selector: 'app-strength-indicator',
  imports: [MatProgressBarModule],
  templateUrl: './strength-indicator.component.html',
  styleUrl: './strength-indicator.component.scss'
})
export class StrengthIndicatorComponent {
  @Input() password: string = '';
  public oneLine: number = 0;
  public twoLine: number = 0;
  public treeLine: number = 0;

  public evaluatePassword() {
    const result = zxcvbn(this.password);
    switch (result.score) {
      case 0: 
      case 1: 
        this.oneLine = 100
        this.twoLine = 0
        this.treeLine = 0
        return 'Weak Password: Easily guessable. Please add more length and variety.';
      case 2: 
      case 3: 
        this.twoLine = 100
        this.treeLine = 0
        return "Good Strength: This password is secure. Consider adding a few more characters for better protection.";
      case 4: 
        this.treeLine = 100
        return "Excellent Password: Strong and highly resistant to brute-force attacks.";
      default: 
        return "Unknown strength level.";
    }
  }
}
