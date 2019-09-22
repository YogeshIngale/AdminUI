import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Router } from '@angular/router';

@Component({
    selector: 'app-formlist',
    templateUrl: './formlist.component.html',
    styleUrls: ['./formlist.component.scss'],
    animations: [routerTransition()]
})
export class FormListComponent implements OnInit {

    public formObj : Object ={
        sectionid : 0,
        formname : '',
         isactive : 1,
         formData : ''
    };

    public formlist:[];
public baseUrl:string;
    constructor(private httpClient : HttpClient,private router: Router) {
        localStorage.removeItem('form');
        this.baseUrl='${environment.apiHost}forms';
    }

    ngOnInit() {
        this.getForms();
    }


    public getForms(){
        debugger;

        return this.httpClient.get(this.baseUrl, {
          headers: new HttpHeaders({
               'Content-Type':  'application/json',
             })
        }).subscribe((reponse)=>{
            this.formlist = reponse['data'];
           });
    }

    editForm(form)
    {
localStorage.setItem('form',JSON.stringify(form));

this.router.navigate(['/createform']);
    }
}
