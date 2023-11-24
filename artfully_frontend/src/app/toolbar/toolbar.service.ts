import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AuthState } from "../authentication/register/interfaces";

@Injectable({
    providedIn: 'root'
})

export class ToolbarService{

    loggedInUser = new BehaviorSubject<AuthState>({
        state: false,
        userid: "",
        username: "",
        role: ""
    });

    constructor(){}
}