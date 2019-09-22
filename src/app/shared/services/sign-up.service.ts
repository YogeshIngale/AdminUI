import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class SignUpService {

    constructor(private httpClient: HttpClient, private baseService: BaseService) { }

    signUpUser(userObj): Observable<any> {

        return this.httpClient.post(`http://localhost:3000/applicationusers`, userObj)
            .pipe(
                catchError(this.baseService.handleError)
            );
    }

    getJsonData(): Observable<any> {

        return this.httpClient.get(`http://localhost:3000/login`)
            .pipe(
                catchError(this.baseService.handleError)
            );
    }

    signInUser(userdata){

       return this.httpClient.post(`http://localhost:3000/login`,userdata)
        .pipe(catchError(this.baseService.handleError));
    }




}
