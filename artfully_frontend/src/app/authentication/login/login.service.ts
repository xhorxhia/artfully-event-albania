import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { User } from "../register/interfaces";


@Injectable({
    providedIn: 'root'
})

export class LoginService {

    private basaeUrl = "http://localhost:3000/user"

    constructor(private http: HttpClient){}

    public loginUser(user: User): Observable<any> {
        return this.http.post(`${this.basaeUrl}` + `/check`, user, { observe: 'response'}).pipe(
            map((res:any) => {return res})
        );
    }
}