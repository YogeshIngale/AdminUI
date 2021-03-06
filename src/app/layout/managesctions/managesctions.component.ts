import { Component,ViewEncapsulation, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { CommonToastrService } from 'src/app/shared/services/common-toastr-service.service';
@Component({
    selector: 'app-managesections',
    templateUrl: './managesctions.component.html',
    styleUrls: ['./managesctions.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [routerTransition()]
})
export class ManageSectionsComponent implements OnInit {

    public formObj : Object ={
        sectionid : 0,
        formname : '',
         isactive : 1,
         formData : ''
    };

    public sectionList:[];
    public sectionUrl: string;
    public loading = false;
public baseUrl:string;
    constructor(private httpClient : HttpClient,private modalService: NgbModal,private router: Router,private toastr:CommonToastrService) {
        localStorage.removeItem('section');
        this.baseUrl=`${environment.apiHost}forms`;
        this.sectionUrl=`${environment.apiHost}sections`;
    }

    ngOnInit() {
        this.getSections();
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

        return this.httpClient.get(this.sectionUrl, {
          headers: new HttpHeaders({
               'Content-Type':  'application/json',
             })
        }).subscribe((reponse)=>{

            this.sectionList = reponse['data'];
           },(error)=>{

            this.toastr.showError('Server error');
        });
    }
}
