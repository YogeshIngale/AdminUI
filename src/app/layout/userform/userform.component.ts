import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-userform',
    templateUrl: './userform.component.html',
    styleUrls: ['./userform.component.scss'],
    animations: [routerTransition()]
})
export class UserFormComponent implements OnInit {
    public answeredformData :any;


    public formObj : Object ={
        sectionid : 0,
        formname : '',
         isactive : 1,
         formData : ''
    };
    public answeredformObj: Object = {
        formid: 0,
        userid: 0,
        formAnswerdData: '',
        answeredDatetime: new Date(),
        sectionid: 0,
        reviewby: 0,
        isreview: false,
        reviewnote: '',
        approvedby: 0,
        isApproved:false,
        modifieddate: new Date(),
        isActive: 1
    };

    public formlist = [];

public baseUrl:string;
public submissionbaseUrl:string;
    constructor(private httpClient : HttpClient,private router: Router) {
        localStorage.removeItem('form');
        this.baseUrl = `${environment.apiHost}forms/getFormbyId`;
        this.submissionbaseUrl = `${environment.apiHost}userforms`;

        this.answeredformData = {
            data: {}
          };
    }

    ngOnInit() {
        this.getFormbysectionid();
    }


    public getFormbysectionid(){
        debugger;
        let sectionObj = JSON.parse(localStorage.getItem('section'));
        return this.httpClient.get(this.baseUrl+"?sectionid="+sectionObj.sectionid, {
          headers: new HttpHeaders({
               'Content-Type':  'application/json',
             })
        }).subscribe((reponse)=>{
            this.formlist = reponse['data'];
            this.formObj = this.formlist[0];
           });
    }
    submitform()
    {
        debugger;
        let userRes = JSON.parse(localStorage.getItem('userDetails'));
        //this.userRole=userRes['usertype'];
        this.answeredformObj['formid'] = this.formObj['formid'];
        this.answeredformObj['userid'] = userRes['userid'];
        this.answeredformObj['sectionid'] = this.formObj['sectionid'];
        this.answeredformObj['formAnswerdData'] = this.answeredformData;
         this.httpClient.post(this.submissionbaseUrl,this.answeredformObj, {
          headers: new HttpHeaders({
               'Content-Type':  'application/json',
             })
        }).subscribe((reponse)=>{
            localStorage.removeItem('section');
            this.router.navigate(['/sections']);
           });
    }
    editForm(form)
    {
localStorage.setItem('form', JSON.stringify(form));

this.router.navigate(['/createform']);
    }
}
