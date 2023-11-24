import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialog } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { EventService } from 'src/event.service';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-fejesa',
  templateUrl: './fejesa.component.html',
  styleUrls: ['./fejesa.component.css']
})
export class FejesaComponent {
  eventsList: any = [];
  editEventForm : FormGroup;
  dialogRef: any;
  toBeEdited: any;
  eventCategory = ['dasme', 'pagezime', 'ditelindje', 'fejesa', 'teTjera'];
  loggedUser: any;
  
  constructor(private eventsService: EventsService,
              private eventService: EventService,
              private dialog: MatDialog,
              private fb: FormBuilder,
              private router: Router){  
                
                this.editEventForm = fb.group({
                  'name': [null, Validators.required],
                  'text': [null, Validators.required],
                  'category': [null, Validators.required]
                });
              }

  ngOnInit(){
    this.loggedUser = JSON.parse(localStorage.getItem('events.loggedUser') || '{}');
    this.getAllFejesa();
  }

  getAllFejesa(){
    this.eventsService.getSpecificEvents('event', 'fejesa').subscribe(data => {
      console.log(data, "dataaaaaaaaaaaaaaaaaaa");
      
      this.eventsList = data;   
    });
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

  openEditModal(templateReference: any, event:any){
    this.dialogRef = this.dialog.open(templateReference, {
      width: '800px',
      disableClose: true
    });

    this.editEventForm.patchValue({
      name: event.name,
      text: event?.text,
      category: event.category
    });
    
    this.toBeEdited = event
  }

  openDeleteModal(id: string) {
        const dialogRef = this.dialog.open(ConfirmationDialog,{
          data:{
            message: 'Je e sigurt qe do ta fshish eventin?',
            buttonText: {
              ok: 'Po',
              cancel: 'Jo'
            }
          }
        });
    
        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
          if (confirmed) {         
            const a = document.createElement('a');
            this.deleteEvent(id)          
          }
        });
      }


  editEvent(post:any, oldE: any){
    console.log(post, oldE);
    oldE.name = post.name;
    oldE.text = post.text;
    oldE.category = post.category;

    this.eventsService.updateEvent(oldE._id, oldE).subscribe(resp => {
      this.resetEdit();
      this.closeDialog();
    
    });
  }

  resetEdit(){
    this.toBeEdited = null;
  }

  deleteEvent(id: string){
    this.eventsService.deleteEvent(id).subscribe(data => {
      this.getAllFejesa();
    })
  }

  goToEvent(event: any){
    EventService.emitSpecificEvent(event);
    this.router.navigate(['event', event._id]);
  }

}
