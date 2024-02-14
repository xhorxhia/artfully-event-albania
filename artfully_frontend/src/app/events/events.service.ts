import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";


@Injectable()
export class EventsService {

    private baseUrl = 'http://localhost:3000/generalEvent'; 

    constructor(private http: HttpClient) { }


    getAll(): Observable<any> {
        const url = `${this.baseUrl}/getAll`;
        return this.http.get(url);
    }

    getSpecificEvents(type: string, category: string){
        return this.http.get(`${this.baseUrl}/`+ type  + '/' + category);
    }

    addNewEvent(event: FormData){
        return this.http.post(`${this.baseUrl}/`+ 'add', event);
    }

    getImage(id:string){
        return this.http.get(`${this.baseUrl}/` + 'image/' + id,
        {responseType: 'arraybuffer'});
    }

    updateEvent(id: string,event: FormData){
        return this.http.put(`${this.baseUrl}/`+id, event);
    }

    deleteEvent(id: string){
        return this.http.delete(`${this.baseUrl}/`+id);
    }

    deleteImageFormEvent(imageId: string, eventId: string){
        return this.http.delete(`${this.baseUrl}/`+ 'deleteImage/' + imageId + '/event/'+ eventId);
    }

    deleteComment(eventId: string, commentId: string){
        return this.http.delete(`${this.baseUrl}/` + eventId + '/comments/' + commentId);
    }

    addComment(eventId: string, comment: any){
        return this.http.post(`${this.baseUrl}/` + eventId + '/addComments', comment);
    }

    getEventById(eventId: string){
        return this.http.get(`${this.baseUrl}/` + eventId);
    }
}



