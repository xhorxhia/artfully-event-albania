import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialog } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { EventsService } from 'src/app/events/events.service';
import { EditEventModalComponent } from 'src/app/shared/edit-event-modal/edit-event-modal.component';
import { EventService } from 'src/event.service';

@Component({
  selector: 'app-dasma-konfeta',
  templateUrl: './dasma-konfeta.component.html',
  styleUrls: ['./dasma-konfeta.component.css']
})
export class DasmaKonfetaComponent implements OnInit {
  eventsList: any = [];
  dialogRef: any;
  toBeEdited: any;
  eventCategory = ['dasme', 'pagezime'];
  loggedUser: any;
  profileImgMap = new Map();
  fileToUpload: File | null = null;
  imagesToUpload: any  = [];
 

  constructor(private eventsService: EventsService,
              private dialog: MatDialog,
              private fb: FormBuilder,
              private router: Router) {

  }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('events.loggedUser') || '{}');
    this.getAllDasmaKonfeta();
  }

  getAllDasmaKonfeta() {
    this.eventsService.getSpecificEvents('konfeta', 'dasme').subscribe(data => {
      this.eventsList = data;

      this.eventsList.event.forEach((event: any)=>{
        
        if(event?.imageFile && event?.imageFile != null){
          this.eventsService.getImage(event.imageFile).subscribe((data:any) => {
            console.log(event);
            
              // Convert ArrayBuffer to base64 string
              const blob = new Blob([data]);
              const reader = new FileReader();
              reader.onload = () => {
              this.profileImgMap.set(event._id,reader.result);

              };
              reader.readAsDataURL(blob);
            },
            (error) => {
              console.error('Error fetching image:', error);
            })
        }
      })
    });
  }

  stopPropagation(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

  
  openEditModal(event:any){
    this.dialog.open(EditEventModalComponent, {
     width: '800px',
     data: {
       item: event,
       eventCategory: this.eventCategory,
       eventsService: this.eventsService,
       imagesToUpload: this.imagesToUpload,
       fileToUpload: this.fileToUpload,
       toBeEdited: this.toBeEdited,
       editEventForm: this.fb.group({
         name: [event.name, Validators.required],
         text: [event.text],
         category: [event.category, Validators.required],
         profileImgUrl: [null],
         eventImages: []
       })
     }
   });
   
   this.toBeEdited = event;
 }

  openDeleteModal(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
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

  deleteEvent(id: string) {
    this.eventsService.deleteEvent(id).subscribe(data => {
      this.getAllDasmaKonfeta();
    })
  }

  goToEvent(event: any){
    EventService.emitSpecificEvent(event);
    this.router.navigate(['event', event._id]);
  }
  
}
