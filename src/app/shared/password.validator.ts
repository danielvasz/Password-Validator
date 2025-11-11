import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ValidatePassword(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const error: ValidationErrors = {};

    if(!/[a-z]/.test(value)) {
        error['lowercase'] = true;
    }

    if (!/[A-Z]/.test(value)) {
        error['uppercase'] = true;
    }

    if (!/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]/.test(value)) {
        error['specialCharacter'] = true;
    }

    return Object.keys(error).length ? error : null;
}

export function MatchPassword(newPassword: string, confirmPassword: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const error: ValidationErrors = {};
        const newPass = control.get(newPassword)?.value;
        const confirmPass = control.get(confirmPassword)?.value;

        if (!newPass || !confirmPass) return null;

        if (newPass !== confirmPass) {
            error['passNoMatch'] = true;
            control.get(confirmPassword)?.setErrors({passNoMatch: true})
        }

        return Object.keys(error).length ? error : null;
    }
}