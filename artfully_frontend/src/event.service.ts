import {Injectable} from '@angular/core';
import {BehaviorSubject, interval, Observable, Subject, Subscription} from "rxjs";

@Injectable()
export class EventService {

    // change title
    static _title =  new Subject();

    static emitSelectedTitle(data: any) {
        this._title.next(data);
    }

    // getAllEvents
    static _events = new Subject();

    static emitAllEvents(data: any[]){
        this._events.next(data);
    }

    // specific event
    static _specificEvent = new BehaviorSubject({});

    static emitSpecificEvent(data: any){
        console.log(data);
        this._specificEvent.next(data);
    }


}
