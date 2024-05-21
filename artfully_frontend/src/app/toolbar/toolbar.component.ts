import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { EventService } from 'src/event.service';
import { AuthState } from '../authentication/register/interfaces';
import { ToolbarService } from './toolbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit{

  title: string = "kreu"
  loginState = false;
  userName = ""
  _userId = ""
  role = ""
  loggedUser: any

  constructor(private router: Router,
              private _service: ToolbarService,
              private eventService: EventService,
             ) { }

  ngOnInit(){
    EventService._title.subscribe((data:any) => {    
      this.title = data;
    });

    this.loadLoggedUser()
  }

  loadLoggedUser() {
    this.loggedUser = JSON.parse(localStorage.getItem('events.loggedUser') || '{}');

    this.loggedUser?.username ? this.loginState = true : this.loginState = false;

    this.loggedUserFnc();
  }


  goToPage(page: any){
    switch(page){
      case 'kreu':
        this.router.navigate(['']);
        EventService.emitSelectedTitle('kreu');
        break;

      case 'evente':
        this.router.navigate(['evente']);
        EventService.emitSelectedTitle('evente');
        break;  

      case 'konfeta':
        this.router.navigate(['konfeta']);
        EventService.emitSelectedTitle('konfeta');
        break;

      case 'kontakt':
        this.router.navigate(['kontakt']);
        EventService.emitSelectedTitle('kontakt');
        break; 
        
      default:
        this.router.navigate(['']);
        EventService.emitSelectedTitle('kreu');
        break;   
    }
    
  }


  auth_btnClicked() {
    
    if (this.loginState) {
      // Perform logout actions
      localStorage.removeItem('events.loggedUser');
      this.loginState = false;
      this.loadLoggedUser(); // Reload user data
      this.router.navigate(['login']);

    } else {

      this.router.navigate(['login']);

    }
  }

  private loggedUserFnc() {  // used to initialize and update the auth state based on user's session data from localStorage 
 
    this._service.loggedInUser.next(  // for refresh
      {
        state: this.loginState,
        userid: this.loggedUser?.id,
        username: this.loggedUser?.username,
        role: this.loggedUser?.role
      }
    )

    this._service.loggedInUser.subscribe(
      (state: AuthState) => {
        this.loginState = state.state
        this._userId = state.userid
        this.userName = state.username
        this.role = state.role
      })
      
      
  }

}
