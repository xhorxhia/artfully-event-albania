import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  loggedUser: any;

  constructor(private router: Router,   
              private eventService: EventService){}

  ngOnInit(){
   this.loggedUser = JSON.parse(localStorage.getItem('events.loggedUser') || '{}');
  }

  goTo(page: any){
    switch(page){
      case 'evente':
        this.router.navigate(['evente']);
        EventService.emitSelectedTitle('evente');
        break;  

      case 'konfeta':
        this.router.navigate(['konfeta']);
        EventService.emitSelectedTitle('konfeta');
        break;
    }
  }

}
