import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialog } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { EventsService } from 'src/app/events/events.service';
import { EventService } from 'src/event.service';

@Component({
  selector: 'app-dasma-konfeta',
  templateUrl: './dasma-konfeta.component.html',
  styleUrls: ['./dasma-konfeta.component.css']
})
export class DasmaKonfetaComponent implements OnInit {
  eventsList: any = [];
  editEventForm: FormGroup;
  dialogRef: any;
  toBeEdited: any;
  eventCategory = ['dasme', 'pagezime'];
  loggedUser: any;

  constructor(private eventsService: EventsService,
              private eventService: EventService,
              private dialog: MatDialog,
              private fb: FormBuilder,
              private router: Router) {

    this.editEventForm = fb.group({
      'name': [null, Validators.required],
      'text': [null, Validators.required],
      'category': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('events.loggedUser') || '{}');
    this.getAllDasmaKonfeta();
  }

  getAllDasmaKonfeta() {
    this.eventsService.getSpecificEvents('konfeta', 'dasme').subscribe(data => {
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

  openEditModal(templateReference: any, event: any) {
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


  editEvent(post: any, oldE: any) {
    console.log(post, oldE);
    oldE.name = post.name;
    oldE.text = post.text;
    oldE.category = post.category;

    this.eventsService.updateEvent(oldE._id, oldE).subscribe(resp => {
      this.resetEdit();
      this.closeDialog();

    });
  }

  resetEdit() {
    this.toBeEdited = null;
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
