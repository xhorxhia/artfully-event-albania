import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EventService } from 'src/event.service';
import { EventsService } from '../events/events.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confetti',
  templateUrl: './confetti.component.html',
  styleUrls: ['./confetti.component.css']
})
export class ConfettiComponent implements OnInit{
  
  dialogRef: any;
  addGeneralEventForm : FormGroup;
  newEvent: any = {};
  eventCategory = ['dasme', 'pagezime', 'fejesa'];
  loggedUser: any;
  fileToUpload: File | null = null;
  imagesToUpload: any  = [];

  promptConfig: MatSnackBarConfig = {
    horizontalPosition: 'center',
    verticalPosition: 'top',
    duration: 2 * 1000
  }
  
  constructor(private router: Router,
              private eventService: EventService,
              private eventsService: EventsService,
              private dialog: MatDialog,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,){

                this.addGeneralEventForm = fb.group({
                  'name': [null, Validators.required],
                  'text': [null, Validators.required],
                  'category': [null, Validators.required]
                });
              }

  ngOnInit(){
    this.loggedUser = JSON.parse(localStorage.getItem('events.loggedUser') || '{}');
    
  }

  goToPage(page:any){
  switch(page){
      case 'dasma-konfeta':
        this.router.navigate(['dasma-konfeta']);
        EventService.emitSelectedTitle('dasma>konfeta');
        break;

      case 'pagezime-konfeta':
        this.router.navigate(['pagezime-konfeta']);
        EventService.emitSelectedTitle('pagezime>konfeta');
        break;
        
      case 'fejesa-konfeta':
        this.router.navigate(['fejesa-konfeta']);
        EventService.emitSelectedTitle('fejesa>konfeta');
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
    this.newEvent.type = 'konfeta';
    this.newEvent.category = post.category;
   console.log(this.newEvent);
   
   const formData = new FormData();
   formData.append('name', this.newEvent.name);    
   formData.append('text', this.newEvent.text);
   formData.append('type', this.newEvent.type);
   formData.append('category', this.newEvent.category);
   
   if (this.fileToUpload && this.imagesToUpload) {
     formData.append('image', this.fileToUpload); // cover image

     for (let i = 0; i < this.imagesToUpload.length; i++) {      
       formData.append('eventImages[]', this.imagesToUpload[i]);
     }
     
     for (const pair of Object.entries(formData)) {
       console.log(pair[0] + ', ' + pair[1]);
     }
      
     try {
       this.eventsService.addNewEvent(formData).subscribe(resp =>{
         this._snackBar.open('New event added  \u2714 😀','', this.promptConfig);
       });
     } catch (error) {
         console.error("Error adding file")
         this._snackBar.open('Error adding file.', 'OK', this.promptConfig);
     }
   } else {
     console.error('No file selected');
     this._snackBar.open('No file selected', 'OK', this.promptConfig);
   }

  console.log(this.newEvent);

   this.addGeneralEventForm.reset();
   this.dialogRef.close();
  }

  handleMultipleImageInput(event: any) {    
    this.imagesToUpload = [];

    if (event?.target?.files) {
      const files: FileList = event.target.files;
      this.imagesToUpload = files;
      console.log(this.imagesToUpload, "EVENT");
    }
    else {
      console.error('No images selected');
    }    
  }

  // images upload
  handleProfileImageInput(event: any) {   
    this.fileToUpload = null

    if (event?.target?.files) {
      const fileList: FileList = event.target.files;

      this.fileToUpload = fileList[0]; 
      //this.fileToUpload = event.target.files;
      console.log(this.fileToUpload, "filee");
      
    } else {
      console.error('No profile picture selected');
    } 
  }


}
