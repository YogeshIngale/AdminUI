import { Component,ViewEncapsulation, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-sections',
    templateUrl: './sections.component.html',
    styleUrls: ['./sections.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [routerTransition()]
})
export class SectionsComponent implements OnInit {

    public formObj : Object ={
        sectionid : 0,
        formname : '',
         isactive : 1,
         formData : ''
    };

    public sectionList:[];
    public sectionUrl: string;
public baseUrl:string;
    constructor(private httpClient : HttpClient,private modalService: NgbModal,private router: Router) {
        localStorage.removeItem('section');
        this.baseUrl='${environment.apiHost}forms';
        this.sectionUrl='${environment.apiHost}sections';
    }

    ngOnInit() {
        this.getSections();
    }



gotoForm(){
    this.router.navigate(['/userform']);
}
    editSection(content, section)
    {
        this.modalService.open(content, { size: 'lg' });
//localStorage.setItem('section',JSON.stringify(section));

//this.router.navigate(['/createform']);
    }
    addnewSection(content){
        this.modalService.open(content, { size: 'lg' });
    }
    public getSections(){
        debugger;

        return this.httpClient.get(this.sectionUrl, {
          headers: new HttpHeaders({
               'Content-Type':  'application/json',
             })
        }).subscribe((reponse)=>{
            this.sectionList = reponse['data'];
           });
    }
}
