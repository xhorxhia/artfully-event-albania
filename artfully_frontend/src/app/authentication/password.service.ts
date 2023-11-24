import { Injectable } from "@angular/core";
import * as CryptoJS from 'crypto-js';



@Injectable({
    providedIn: 'root'
})

export class PasswordService {

    hashPassword(password: string): string {
        return CryptoJS.SHA256(password).toString();
    }
}