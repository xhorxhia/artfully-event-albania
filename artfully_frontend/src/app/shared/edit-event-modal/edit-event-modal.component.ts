import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventsService } from 'src/app/events/events.service';


@Component({
  selector: 'app-edit-event-modal',
  templateUrl: './edit-event-modal.component.html',
  styleUrls: ['./edit-event-modal.component.css']
})
export class EditEventModalComponent{
  
  eventsList: any = [];
  editEventForm: FormGroup;
  toBeEdited: any;
  eventCategory = ['dasme', 'pagezime', 'ditelindje', 'fejesa', 'teTjera'];
  loggedUser: any;
  profileImgMap = new Map();
  fileToUpload: File | null = null;
  imagesToUpload: any = [];

  constructor(private eventsService: EventsService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditEventModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { 
      this.editEventForm = this.fb.group({
        name: [data.item.name, Validators.required],
        category: [data.item.category, Validators.required],
        text: [data.item.text],
        profileImgUrl: [],
        eventImages: []

      });
  }


  closeDialog() {
    if (this.dialogRef != null) {
      this.dialogRef.close();
    }
  }


  editEvent(post:any, oldE: any){
    console.log(post, oldE);
    oldE.name = post.name;
    oldE.text = post.text;
    oldE.category = post.category;

    const formData = new FormData();
    formData.append('name', post.name);    
    formData.append('text', post.text);
    formData.append('category', post.category);

    // if photo cover
    if(this.fileToUpload !=null){
      formData.append('image', this.fileToUpload);
    }   

    // if other photos
    if(this.imagesToUpload?.length >0){
      for (let i = 0; i < this.imagesToUpload?.length; i++) {      
        formData.append('eventImages[]', this.imagesToUpload[i]);
      }
    }
      
    try {
      
      this.eventsService.updateEvent(oldE._id,formData).subscribe(resp =>{
        
      },
      (error) => {
        console.log("Error updating event", error)
      });
    } catch (error) {
        console.error("Error adding file")
    }   

    this.resetEdit();
    this.closeDialog();
  }

  handleMultipleImageInput(event: any) {        
    this.imagesToUpload = [];

    if (event?.target?.files) {
      const files: FileList = event.target.files;
      this.imagesToUpload = files;

    }  
  }

  // images upload
  handleProfileImageInput(event: any) {   
    this.fileToUpload = null

    if (event?.target?.files) {
      const fileList: FileList = event.target.files;

      this.fileToUpload = fileList[0];     
      
    }
  }

  resetEdit(){
    this.toBeEdited = null;
  }
















}
