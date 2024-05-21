import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { EventService } from 'src/event.service';
import { Location } from '@angular/common';
import { EventsService } from '../events/events.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-specific-event',
  templateUrl: './specific-event.component.html',
  styleUrls: ['./specific-event.component.css']
})
export class SpecificEventComponent implements OnInit{

  @ViewChild('myCarousel', { static: false }) myCarousel: any;

  event: any;
  imagesArrayMap = new Map();
  loggedUser: any;

  constructor(private eventService: EventService,
              private service: EventsService,
              private dialog: MatDialog,
              private cdr: ChangeDetectorRef,
              private location: Location) {}

  ngOnInit(){
    this.loggedUser = JSON.parse(localStorage.getItem('events.loggedUser') || '{}');

    this.getEventFromUrl();
  } 
  
  getEventFromUrl(){  
    const id = this.location.path().replace('/event/', '');
    
    this.service.getEventById(id).subscribe((res:any) => {
      this.event = res.event;
      
      if(this.event?.imagesArray && this.event?.imagesArray != null){
        this.event.imagesArray.forEach((img: any) => {
           this.service.getImage(img).subscribe((data:any) => {
              // Convert ArrayBuffer to base64 string
              const blob = new Blob([data]);
              const reader = new FileReader();
              reader.onload = () => {
                this.imagesArrayMap.set(img, reader.result);
    
              };              
              reader.readAsDataURL(blob);
            },
            (error) => {
              console.error('Error fetching image:', error);
            })
        })
         
      }
    }); 
   
  }

  openDeleteModal(id: any){
    const dialogRef = this.dialog.open(ConfirmationDialog,{
      data:{
        message: 'Je e sigurt qe do ta fshish foton?',
        buttonText: {
          ok: 'Po',
          cancel: 'Jo'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {         
        const a = document.createElement('a');
         this.deleteImage(id)          
      }
    });

  }

  deleteImage(id: string){
 
    this.service.deleteImageFormEvent(id, this.event._id).subscribe(res => {      

      this.service.getEventById(this.event._id).subscribe((res:any) => {
        this.event = res.event;
       
        // update the images to show
        this.imagesArrayMap.delete(id)
      })    
      
    },
    (error) => {
      console.log("Error deleting the image from the event", error);
    })
  }
 

  next() {
    this.myCarousel.next();
  }

  handleCarouselEvents(event: any) {
    console.log(event);
  }

}

