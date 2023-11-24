import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EncryptionPipe } from '../encryption.pipe';
import { PasswordService } from '../password.service';
import { ErrorMessage } from './enums';
import { CustomValidators } from './register.custom.validator';
import { RegisterService } from './register.service';

export class EmailErrorStateMatcher implements ErrorStateMatcher {
  // This class is used to run character verification upon the Form's input at the "Email" Field.
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstNameFormControl = new FormControl('', [Validators.required])
  lastNameFormControl = new FormControl('', [Validators.required])

  usernameFormControl = new FormControl('', [Validators.required])

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  emailMatcher = new EmailErrorStateMatcher();

  passwordFormControl = new FormControl('', [Validators.required, CustomValidators.uppercase, CustomValidators.lowercase, CustomValidators.numeric, CustomValidators.special])
  hidePassword = true;

  passwordFormControl2 = new FormControl('', [Validators.required, CustomValidators.uppercase, CustomValidators.lowercase, CustomValidators.numeric, CustomValidators.special])

  promptConfig: MatSnackBarConfig = {
    horizontalPosition: 'center',
    verticalPosition: 'top',
    duration: 2 * 1000
  }

  constructor(private _service: RegisterService,
    //  private _encryption: EncryptionPipe,
      private passwordService: PasswordService,
      private _snackBar: MatSnackBar, 
      private _router: Router,
    ) {}

  ngOnInit(): void {
  }

  submit_btnClicked() {
    if(this.firstNameFormControl.touched == false || this.lastNameFormControl.touched == false || this.usernameFormControl.touched == false || this.emailFormControl.touched == false ||this.passwordFormControl.touched == false){
      this._snackBar.open(ErrorMessage.UntouchedAuthentificationFields, 'OK', this.promptConfig);
    }
    else if(this.firstNameFormControl.status == "INVALID" || this.lastNameFormControl.status == "INVALID" || this.usernameFormControl.status == 'INVALID' || this.emailFormControl.status == 'INVALID' || this.passwordFormControl.status == 'INVALID'){
      this._snackBar.open(ErrorMessage.InvalidAuthentificationFields, 'OK', this.promptConfig);
    }
    else{
      this._service.registerUser(
        {
          firstName: this.firstNameFormControl.value === null ? undefined : this.firstNameFormControl.value,
          lastName: this.lastNameFormControl.value === null ? undefined : this.lastNameFormControl.value,
          username: this.usernameFormControl.value === null ? undefined : this.usernameFormControl.value,
          email: this.emailFormControl.value === null ? undefined : this.emailFormControl.value,
          password: this.passwordFormControl.value === null ? undefined :  this.passwordService.hashPassword(this.passwordFormControl.value), //this._encryption.transform(this.passwordFormControl.value)
          role: 'user'
        })
        .subscribe(
        (res) => {  
         
          if(res.body?.errorFlag == true){
            this._snackBar.open(res.body.reasoning, 'OK', this.promptConfig);
          }
          else{   
            this._router.navigate(['/']);
          }
        },
        (error) =>  {
          if(error.status == 0){
            this._snackBar.open(ErrorMessage.StatusZeroRequest, 'OK', this.promptConfig);
          }
        })
    }
  }

}
