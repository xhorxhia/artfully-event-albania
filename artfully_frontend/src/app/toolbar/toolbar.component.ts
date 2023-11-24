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

   this.loggedUser = JSON.parse(localStorage.getItem('events.loggedUser') || '{}');
   this.loggedUserFnc()
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
    this.router.navigate(['login']);

    if (this.loginState == true) {
      this._service.loggedInUser.next(
        {
          state: false,
          userid: "",
          username: "",
          role: ""
        }
      );
     
    }
    
  }

  private loggedUserFnc() {
    this._service.loggedInUser.next(
      {
        state: true,
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
