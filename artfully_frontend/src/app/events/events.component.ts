import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EventService } from 'src/event.service';
import { EventsService } from './events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit{

 dialogRef: any;
 addGeneralEventForm : FormGroup;
 newEvent: any = {};
 eventCategory = ['dasme', 'pagezime', 'ditelindje', 'fejesa', 'teTjera'];
 loggedUser: any;

  constructor(private router: Router,
              private eventService: EventService,
              private eventsService: EventsService,
              private dialog: MatDialog,
              private fb: FormBuilder,){
               
                this.addGeneralEventForm = fb.group({
                  'name': [null, Validators.required],
                  'text': [null, Validators.required],
                  'category': [null, Validators.required]
                });
              }

  ngOnInit(){
    this.loggedUser = JSON.parse(localStorage.getItem('events.loggedUser') || '{}');
    
  }

  goToPage(page: any){
    switch(page){
      case 'dasma':
        this.router.navigate(['dasma']);
        EventService.emitSelectedTitle('dasma');
        break;

      case 'pagezime':
        this.router.navigate(['pagezime']);
        EventService.emitSelectedTitle('pagezime');
        break;  

      case 'ditelindje':
        this.router.navigate(['ditelindje']);
        EventService.emitSelectedTitle('ditelindje');
        break;

      case 'fejesa':
        this.router.navigate(['fejesa']);
        EventService.emitSelectedTitle('fejesa');
        break; 
        
      case 'te tjera':
        this.router.navigate(['teTjera']);
        EventService.emitSelectedTitle('te tjera');
        break;  
        
      default:
        this.router.navigate(['']);
        EventService.emitSelectedTitle('kreu');
        break;     
    }
  }

  stopPropagation(event: any) {
    event.stopPropagation();
    event.preventDefault();
  } 

  closeDialog() {
    if (this.dialogRef != null) {
        this.dialogRef.close();
    }
  }

  openAddModal(templateReference: any){
    this.addGeneralEventForm.reset();

    this.dialogRef = this.dialog.open(templateReference, {
      width: '800px',
      disableClose: true
    });
  }

  createRequest(post: any){
    this.newEvent.name = post.name;
    this.newEvent.text = post?.text;
    this.newEvent.type = 'event';
    this.newEvent.category = post.category;
   console.log(this.newEvent);
   
  this.eventsService.addNewEvent(this.newEvent).subscribe(resp =>{

  });

    this.addGeneralEventForm.reset();
    this.dialogRef.close();
  }

}
