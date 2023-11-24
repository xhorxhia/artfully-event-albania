import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EventService } from 'src/event.service';
import { Location } from '@angular/common';
import { EventsService } from '../events/events.service';

@Component({
  selector: 'app-specific-event',
  templateUrl: './specific-event.component.html',
  styleUrls: ['./specific-event.component.css']
})
export class SpecificEventComponent implements OnInit{

  @ViewChild('myCarousel', { static: false }) myCarousel: any;

  event: any;

  constructor(private eventService: EventService,
              private service: EventsService,
              private location: Location) {}

  ngOnInit(){

    EventService._specificEvent.subscribe(data => {
      this.event = data
   
    }) 
    console.log(this.event);

    this.getEventFromUrl();
  } 
  
  getEventFromUrl(){
    const id = this.location.path().replace('/event/', '');
    this.service.getEventById(id).subscribe((res:any) => {
      this.event = res.event;
    })
  }

  next() {
    this.myCarousel.next();
  }

  handleCarouselEvents(event: any) {
    console.log(event);
  }

  images = [
    {path: '../../assets/logos/email.png'},
    {path: '../../assets/logos/email.png'},
    {path: '../../assets/logos/email.png'},
    
];   

}

