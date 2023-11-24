import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/app/toolbar/toolbar.service';
import { EncryptionPipe } from '../encryption.pipe';
import { PasswordService } from '../password.service';
import { ErrorMessage } from '../register/enums';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hidePassword: boolean = true;
  password = new FormControl('', [Validators.required]);
  username = new FormControl('', [Validators.required]);

  promptConfig: MatSnackBarConfig = {
    horizontalPosition: 'center',
    verticalPosition: 'top',
    duration: 2 * 1000
  }

  constructor(private _toolbar: ToolbarService, 
              private _service: LoginService, 
              private _snackBar: MatSnackBar, 
              // private _encryption: EncryptionPipe, 
              private passwordService: PasswordService,
              private _router: Router){}


  onClick(){
    if(this.username.touched == false || this.password.touched == false){
      this._snackBar.open(ErrorMessage.UntouchedAuthentificationFields, 'OK', this.promptConfig);
    }
    else if(this.username.status == "INVALID" || this.password.status == "INVALID"){
      this._snackBar.open(ErrorMessage.InvalidAuthentificationFields, 'OK', this.promptConfig);
    }
    this._service.loginUser(
      {
        firstName: undefined,
        lastName: undefined,
        username: this.username.value === null ? undefined : this.username.value,
        email: undefined,
        password: this.password.value === null ? undefined :  this.passwordService.hashPassword(this.password.value) //this._encryption.transform(this.password.value)
      })
      .subscribe(
      (res) => {
        console.log(res);
        
        if(res.body?.errorFlag == true){
          this._snackBar.open(res.body.reasoning, 'OK', this.promptConfig);
        }
        else{
          this._toolbar.loggedInUser.next(
            {
              state: true,
              userid: res.body?.userExists.id,
              username: res.body?.userExists.username,
              role: res.body?.userExists.role
            }
          );
          
          localStorage.setItem('events.loggedUser', JSON.stringify(res.body.userExists));
          this._router.navigate(['/']);
        }
      },
      (error) => {
        if(error.status == 0){
          this._snackBar.open(ErrorMessage.StatusZeroRequest, 'OK', this.promptConfig);
        }
      })
  }

  goToRegister(){
    this._router.navigate(['register']);
  }
}
