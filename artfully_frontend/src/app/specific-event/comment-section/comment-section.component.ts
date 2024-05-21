import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialog } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { EventsService } from 'src/app/events/events.service';
import { EventService } from 'src/event.service';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit, OnChanges {

  loggedUser: any = {};
  dialogRef: any;
  commentsList: any[] = [];
  itemValue: string = "";
 
  @Input()
  event: any;

  constructor(private service: EventsService,
              private eventService: EventService,
              private dialog: MatDialog){}

  ngOnInit(){
    this.loggedUser = JSON.parse(localStorage.getItem('events.loggedUser') || '{}');
    console.log(this.loggedUser, "User");
    
    EventService._specificEvent.subscribe(data => {
      this.event = data  
      this.getAllComments(this.event) 
    })
  }

  ngOnChanges(changes: any){
    if(changes?.event?.currentValue){
      this.getAllComments(changes?.event?.currentValue);
    }
    
  }

  async deleteComment(id: string){
    this.service.deleteComment(this.event._id, id).subscribe(res => {
    })

   await this.service.getEventById(this.event._id).subscribe((res:any) => {
      this.event = res.event;
     
      this.commentsList = this.commentsList.filter(com => com._id !== id);
      console.log(this.commentsList, "comments list"  );
      EventService.emitSpecificEvent(this.event);
    })  
  }

  saveComment(value: any){
    let obj = {
      "description": value,
      "username": this.loggedUser?.username
    }
    
    this.service.addComment(this.event._id, obj).subscribe(res => { 

    })
    
    this.itemValue = ""; 
   
    this.service.getEventById(this.event._id).subscribe((res:any) => {
      this.event = res.event;
      EventService.emitSpecificEvent(this.event);
    })       
  }

  getAllComments(event: any){
    this.commentsList = event?.comments;
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

  openDeleteModal(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialog,{
      data:{
        message: 'Je e sigurt qe do ta fshish komentin?',
        buttonText: {
          ok: 'Po',
          cancel: 'Jo'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {         
        const a = document.createElement('a');
        this.deleteComment(id);
     
      }
    });
  }


}
